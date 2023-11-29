import fs from 'fs';
import ver from './version.json' assert { type: 'json' };
import pkg from './package.json' assert { type: 'json' };

// convert to semver-compliant
let version = ver.version;
version = version.split('.');
const build = version[3];
version.pop();
version = version.join('.');
version += '+' + build;

if (pkg.version !== version) {
  // eslint-disable-next-line no-comment
  console.log('Update package.json version number');
  pkg.version = version;
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
}
