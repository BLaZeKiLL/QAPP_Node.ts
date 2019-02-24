import * as shell from 'shelljs';

shell.cp('-R', 'src/GraphQL/Schemas/', 'dist/GraphQL/');
shell.mkdir('./dist/Logs');
