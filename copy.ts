import * as shell from 'shelljs';

shell.cp('-R', 'src/GraphQL/Schemas/', 'dist/GraphQL/');
shell.cp('-R', 'src/Static/', 'dist/');
shell.mkdir('./dist/Logs');
