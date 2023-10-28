export type Note = {
    id: string;
  } & NoteData; // Transfers all types of noteData here
  
  export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[]; // {id:"12312",label:"Entertainment"}
  };
  
  export type Tag = {
    id?: string;
    label?: string;
  };
  
//types to be sent to local storage
  export type RawNote = {
    id: string;
  } & RawNoteData;
  
  export type RawNoteData = {
    title: string;
    markdown: string;
    tagId: string[]; // ["asd123","fdsaf123"]
  };