# Figma Code Connect

The `figma_connect` folder contains `tsx` files used to set up Figma Code Connect for components in the Teamshares UI Figma library.

For more about Figma Code Connect, see: [https://github.com/figma/code-connect/blob/main/docs/react.md](https://github.com/figma/code-connect/blob/main/docs/react.md)

## Token access (product@) for Figma Code Connect

To run figma connect commands, you'll need to have a secure token tied to a Figma account. A token associated with the shared `product@` account has been added to doppler.

To set up doppler for this project, first run:

```
> doppler setup
```

Then select `shoelace` from the list of projects, then `dev` for the config.

Now prefix `doppler run` before any `npx figma` commands to use the token.

For example:

```
> doppler run npx figma connect publish
```

## Figma Code Connect Basics

### To auto-create a new Figma Connect file

1. In the Teamshares UI Figma library, right-click on the component you want to connect and choose "Copy link to selection".

You can also use the Command + L shortcut key. Either method will copy the component's link to your clipboard.

2. Now run the following command in your terminal, replacing "https://..." with the link you just copied:

```
> doppler run npx figma connect create "https://..."
```

3. The command will create a new `.tsx` file in your main directory.

4. Drag the new file into the `figma_connect` folder, and rename the file with just the component name + `figma`.

5. The boilerplate example in the new file can mostly be replaced with the following structure:

```
// @ts-nocheck <-- This is to stop typescript from complaining about the Code Connect code.

import React from 'react';
import figma from '@figma/code-connect';

figma.connect(
  '{This should be prefilled with the link you pasted into your 'create' command}',
  {
    props: {
      // Code connect will try to auto-generate code here based on the
      // structure of the Figma component. Because of the differences in structure
      // between Figma and code components, a lot of this will need to be rewritten.
    },
    example: ({ props }) => {
      return (
        { Example code }
      );
    }
  }
);
```

6. Follow the examples in the existing files, as well as the [Code Connect Docs](https://github.com/figma/code-connect/blob/main/docs/react.md), to set up the dynamic code snippets using Figma's [Code Connect Helpers](https://github.com/figma/code-connect/blob/main/docs/react.md#strings).

### To publish code connect files

1. When you are ready to publish the files, use this command:

```
> doppler run npx figma connect publish
```

2. Once Code Connect files are published, they work immediately with components in the Teamshares UI library.

### To check the current version of Code Connect

```
npm list @figma/code-connect
```

### To update to the latest version of Code Connect

```
npm install @figma/code-connect@latest
```
