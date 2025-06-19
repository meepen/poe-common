// Scrapes the URL https://www.pathofexile.com/developer/docs/reference#types
// and converts the types to TypeScript interfaces.

// import axios from 'axios';
import { JSDOM } from 'jsdom';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';

const BASE_URL = 'https://www.pathofexile.com/developer/docs/reference#types';
const OUTPUT_FILE = './src/types/poe.d.ts';
const outStream = createWriteStream(OUTPUT_FILE);

// const response = (await axios.get(BASE_URL)).data;
const response = await readFile('./docs/docs.htm', 'utf-8');

const dom = new JSDOM(response);
const Node = dom.window.Node;

const typesArticle = dom.window.document.querySelector("article#types");

if (!typesArticle) {
    throw new Error('Types article not found');
}

const tables = typesArticle.querySelectorAll('table') as NodeListOf<HTMLTableElement>;

interface ObjectTypeDetails {
    key: string;
    isArray?: true;
    isOptional?: true;
    valueType: string;
    extraInfo?: string;
    children?: ObjectTypeDetails[];
}

const htmlTab = String.fromCharCode(0x2002) + String.fromCharCode(0x2003);
const htmlKeyChar = String.fromCharCode(0x21B3) + String.fromCharCode(0x2003);

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

        let isOptional: true | undefined = undefined;
        if (valueType.startsWith('?')) {
            isOptional = true;
            valueType = valueType.slice(1); // Remove the '?' character
        }

        let isArray: true | undefined = valueType.startsWith('array of ') ? true : undefined;
        if (isArray) {
            valueType = valueType.slice('array of '.length); // Remove "array of "
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
            isArray,
            isOptional,
        };

        parent.push(typeDetail);
    }

    return typeDetails;
}

interface EnumTypeDetails {
    values: Record<number, string>;
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

    const enumDetails: EnumTypeDetails = { values: {} };
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
        enumDetails.values[parsedValue] = info.trim();
    }

    return enumDetails;
}

export type TypeDetails =
    | { type: 'enum', name: string, subtitle?: string, details: EnumTypeDetails }
    | { type: 'object', name: string, subtitle?: string, details: ObjectTypeDetails[] };

function findTableDetails(table: HTMLTableElement): TypeDetails | null {
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

function safeName(name: string): string {
    return name
        .trim()
        .replace(/[^a-zA-Z0-9_ ]/g, '')
        .replace(/^[0-9]/, '_$&')
        .split(' ')
        .map((part, index) => 
            index === 0
                ? part
                : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}
function toJavaScriptType(type: string, children?: ObjectTypeDetails[] | undefined): string {
    switch (type) {
        case 'uint':
        case 'int':
        case 'double':
        case 'float':
            return 'number';
        case 'bool':
            return 'boolean';
        case 'array': // check if children is defined, and create a type from that
            if (children && children.length > 0) {
                return `[${children.map(child => toJavaScriptType(child.valueType, child.children)).join(', ')}]`;
            }
            return 'unknown[]';
        default:
            break;
    }

    const types = type.split(' or ').map(t => t.trim());
    if (types.length === 1) {
        if (types[0].indexOf(' as ') !== -1) { // this is a enum value...
            return types[0].split(' as ')[1].trim();
        }
        return types[0].trim();
    }
    return `(${types.map((type) => toJavaScriptType(type)).join(' | ')})`;
}

function writeEnum(name: string, details: EnumTypeDetails) {
    outStream.write(`export enum ${safeName(name)} {`);
    for (const [value, info] of Object.entries(details.values)) {
        outStream.write(`\n\t${safeName(info)} = ${value}, // ${info}`);
    }

    outStream.write(`\n}`);
}

function writeObject(name: string, details: ObjectTypeDetails[]) {
    outStream.write(`export interface ${safeName(name)} {`);
    for (const detail of details) {
        if (detail.extraInfo) {
            outStream.write(`\n  /* ${detail.extraInfo} */`);
        }
        outStream.write(`\n  ${safeName(detail.key)}${detail.isOptional ? '?' : ''}: ${toJavaScriptType(detail.valueType, detail.children)}${detail.isArray ? '[]' : ''};`);
    }
    outStream.write(`\n}`);
}

for (
    const type of Array.from(tables)
        .map(findTableDetails)
        .filter((val): val is NonNullable<typeof val> => val !== null)
) {
    outStream.write(`
/**
 * ${type.type} ${type.name}${type.subtitle ? `
 * ${type.subtitle}` : ''}
 * Generated from ${BASE_URL}
 */
`);
    switch (type.type) {
        case 'enum':
            writeEnum(type.name, type.details);
            break;
        case 'object':
            writeObject(type.name, type.details);
            break;
        default:
            console.warn(`Unknown data`);
            break;
    }
}