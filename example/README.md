# Example grunt rekai 
Grunt task for Fingerprinting based on the file modified time / Nodejs Crypto md5 algorithm.
This Grunt task can be used for assets versioning  

## Setup

```
npm install
grunt

```
#### Before grunt task

```
|_textfile-one.js
|_textfile-two.js
|_textfile-three.js
```
#### After grunt task

```
|_textfile-one-***.js
|_textfile-two.js
|_textfile-two-***.js
|_textfile-three.js
|_fingerprint.txt
```
