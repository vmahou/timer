export function swap<T extends HTMLElement, R extends HTMLElement | Node>(old: T, _new: R): R {
    old.replaceWith(_new);
    return _new;
}