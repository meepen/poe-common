import { DOMWindow } from "jsdom";
import { ObjectTypeDetails } from "./object-type-details.js";
import { JSDOM } from 'jsdom';

const htmlTab = String.fromCharCode(0x2002) + String.fromCharCode(0x2003);
const htmlKeyChar = String.fromCharCode(0x21B3) + String.fromCharCode(0x2003);

export interface EnumTypeDetails {
    values: Map<number, string>;
}

export type TypeDetails =
    | { type: 'enum', name: string, subtitle?: string, details: EnumTypeDetails }
    | { type: 'object', name: string, subtitle?: string, details: ObjectTypeDetails[] };

export function htmlToData(html: string): TypeDetails[] {
    const dom = new JSDOM(html);

    const typesArticle = dom.window.document.querySelector("article#types");

    if (!typesArticle) {
        throw new Error('Types article not found');
    }

    const tables = typesArticle.querySelectorAll('table') as NodeListOf<HTMLTableElement>;

    return Array.from(tables)
        .map((table) => findTableDetails(table, dom.window))
        .filter((val): val is NonNullable<typeof val> => val !== null)
}

function convertObjectRowsToTypeDetails(table: HTMLTableElement): ObjectTypeDetails[] | null {
    const headerKeys = Array.from(
        table.querySelectorAll('thead tr th')
    ).map(th => th.textContent?.trim()).filter(Boolean) as string[];

    if (!headerKeys.includes('Key')) {
        console.warn('No "Key" column found in table, skipping');
        return null;
    }
    if (!headerKeys.includes('Value Type')) {
        console.warn('No "Value Type" column found in table, skipping');
        return null;
    }
    if (!headerKeys.includes('Extra Information')) {
        console.warn('No "Extra Information" column found in table, skipping');
        return null;
    }

    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        const row: Record<string, string> = {};
        for (let i = 0; i < headerKeys.length; i++) {
            row[headerKeys[i]] = cells[i]?.textContent || '';
        }
        return row;
    });

    if (!headerKeys.includes('Key') || !headerKeys.includes('Value Type')) {
        // If the required columns are not present, we cannot process the rows
        console.warn('Missing required columns in table rows, skipping');
        return null
    }

    const typeDetails: ObjectTypeDetails[] = [];
    for (const row of rows) {
        let key = row['Key'];
        let valueType = row['Value Type'];
        const extraInfo = row['Extra Information'];

        if (!key || !valueType) {
            console.warn('Missing required fields in row, skipping');
            continue;
        }

        // find parent if applicable
        let parent: ObjectTypeDetails[] = typeDetails;
        while (key.startsWith(htmlTab)) {
            key = key.slice(htmlTab.length);
            let newParent = parent[parent.length - 1].children;
            if (!newParent) {
                newParent = [];
                parent[parent.length - 1].children = newParent;
            }
            parent = newParent;
        }

        if (key.startsWith(htmlKeyChar)) {
            // indicates something new needs to be created
            key = key.slice(htmlKeyChar.length); // Remove the htmlKeyChar
            let newParent = parent[parent.length - 1].children;
            if (!newParent) {
                newParent = [];
                parent[parent.length - 1].children = newParent;
            }
            parent = newParent;
        }

        const typeDetail: ObjectTypeDetails = {
            key: key.trim(),
            valueType,
            extraInfo: extraInfo || undefined,
        };

        parent.push(typeDetail);
    }

    return typeDetails;
}

function convertEnumRowsToTypeDetails(table: HTMLTableElement): EnumTypeDetails | null {
    const headerKeys = Array.from(
        table.querySelectorAll('thead tr th')
    ).map(th => th.textContent?.trim()).filter(Boolean) as string[];

    if (!headerKeys.includes('Value') || !headerKeys.includes('Information')) {
        console.warn('No "Value" or "Information" column found in table, skipping');
        return null;
    }

    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        const row: Record<string, string> = {};
        for (let i = 0; i < headerKeys.length; i++) {
            row[headerKeys[i]] = cells[i]?.textContent || '';
        }
        return row;
    });

    const enumDetails: EnumTypeDetails = { values: new Map() };
    for (const row of rows) {
        const value = row['Value'];
        const info = row['Information'];

        if (!value || !info) {
            console.warn('Missing required fields in row, skipping');
            continue;
        }

        // Parse the value, which can be a number or a string
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            console.warn(`Invalid value "${value}" in row, skipping`);
            continue;
        }

        // Store the information associated with the value
        enumDetails.values.set(parsedValue, info.trim());
    }

    return enumDetails;
}

function findTableDetails(table: HTMLTableElement, { Node }: DOMWindow): TypeDetails | null {
    let header: ChildNode | null = table.previousSibling;
    let subtitle: string | undefined;
    while (header && (header.nodeType !== Node.ELEMENT_NODE || header.nodeName !== 'H3')) {
        if (header?.nodeName === 'DIV') {
            let div = header as HTMLDivElement;
            if (div.getAttribute('role') === 'doc-subtitle') {
                subtitle = div.textContent?.trim() || undefined;
            }
        }
        header = header.previousSibling;
    }

    if (!header) {
        console.warn('No header found for table, skipping');
        return null;
    }

    if (header!.nodeType !== Node.ELEMENT_NODE) {
        console.warn('Header is not an element node, skipping');
        return null;
    }

    const typeType = (header as HTMLElement).querySelector('small')?.textContent?.trim();
    if (!typeType) {
        console.warn('No type info found in header, skipping');
        return null;
    }

    const typeName = (header as HTMLElement).querySelector('small')?.nextSibling?.textContent?.trim();
    if (!typeName) {
        console.warn('No type name found in header, skipping');
        return null;
    }

    switch (typeType) {
        case 'enum':
            const enumDetails = convertEnumRowsToTypeDetails(table);
            if (!enumDetails) {
                console.warn('No enum details found in table, skipping');
                return null;
            }
            return {
                type: 'enum',
                name: typeName,
                details: enumDetails,
                subtitle,
            };
        case 'object':
            const details = convertObjectRowsToTypeDetails(table);
            if (!details) {
                console.warn('No details found in table, skipping');
                return null;
            }

            return {
                type: 'object',
                name: typeName,
                details: details,
                subtitle,
            };
        default:
            console.warn(`Unknown type "${typeType}" in header, skipping`);
            return null;
    }
}
