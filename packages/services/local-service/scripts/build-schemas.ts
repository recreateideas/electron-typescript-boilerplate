import * as TJS from 'typescript-json-schema';
import path from 'path';
import fs from 'fs';

const program = TJS.getProgramFromFiles(
    [path.resolve(__dirname, '../controllers/docker-compose.d.ts')],
    require('../../tsconfig.json')
);

const schema = TJS.generateSchema(program, 'IActionRequest');

const output_path = `${__dirname}/ciao.json`;

const schemaString = JSON.stringify(schema, null, 2);
fs.writeFileSync(output_path, schemaString);
