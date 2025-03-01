'use client';

import { Ref } from 'react';

import { useTheme } from 'next-themes';

import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  toolbarPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import './dark-editor.css';
import { basicDark } from 'cm6-theme-basic-dark';

interface Props {
  value: string;
  editorRef: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

const Editor = ({ value, editorRef, fieldChange }: Props) => {
  const { resolvedTheme } = useTheme();

  const themeExtension = resolvedTheme === 'dark' ? [basicDark] : [];

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      onChange={fieldChange}
      className='light-border-2 background-light800_dark200 markdown-editor dark-editor grid w-full border'
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            txt: 'txt',
            sql: 'sql',
            html: 'html',
            sass: 'sass',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            ts: 'typescript',
            '': 'unspecified',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)'
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: themeExtension
        }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                      <Separator />

                      <InsertCodeBlock />
                    </>
                  )
                }
              ]}
            />
          )
        })
      ]}
    />
  );
};

export default Editor;
