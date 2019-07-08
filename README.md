# relative-path

Simple class for manipulating files from a relative path

```ts
const relPath = new RelativePath({ baseDir: '/path/to/dir' });
relPath.listFiles();
relPath.listFiles('sub/folder');
relPath.getFile('path/to/file');
```
