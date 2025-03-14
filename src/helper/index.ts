import { closest } from "fastest-levenshtein";

export * from "./jwt-helper";

export function getActivePath(curPath: string, allPaths: string[], ignorePaths?: string[]) {
    const adjustedPaths = allPaths.concat(ignorePaths || []);
    return closest(curPath, adjustedPaths);
}