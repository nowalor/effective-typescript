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
