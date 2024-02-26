function foo(x?: number | string | null) {
  if (!x) {
    /*
     * Interestingly the type of "x" in this block is
     * string | number | null | undefined
     * Technically it could still be "" or 0 or -1 in this block
     * So it can not exclude those types
     */
  } else {
    /*
     * typeof "x" is string | number
     */
  }
}

/*
 * This is a pattern known as a "tagged union" or "discriminated union"
 */
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}

interface DownloadEvent {
  type: "download";
  filename: string;
}

function handleEvent(e: UploadEvent | DownloadEvent) {
  switch (e.type) {
    case "download":
    // Type is DownloadEvent
    case "upload":
    // Type is UploadEvent
  }
}

/* ----------------------------------------------------------------------*/

/*
 *This pattern is known as a user-defined type guard
 * : el is HTMLInputElement  tells the type checker it can narrow the type
 */
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value" in el;
}

function getElementContents(el: HTMLElement) {
  if (isInputElement(el)) {
    el; //: HTMLInputElement
  } else {
    el; //: HTMLElement
  }
}
