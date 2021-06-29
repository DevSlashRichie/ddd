
export class E {

  /**
   * Convert an index of enum to the object
   * @param l The Enum
   * @param e The index
   */
  public static toStr (l: any, e: number) : string {
    return Object.keys(l)[e];
  }

}