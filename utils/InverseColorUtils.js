/**
 * Renvoie true si la couleur hex est 'claire'
 * Utilise la formule Y = (R×299 + G×587 + B×114) / 1000
 */
export function isColorLight(hex) {
    // supprime le '#' et convertit en entier
    const c = hex.charAt(0) === "#" ? hex.substring(1) : hex;
    const num = parseInt(c, 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    const y = (r * 299 + g * 587 + b * 114) / 1000;
    return y > 128;
}

/**
 * Renvoie '#000' si fond clair, sinon '#fff'
 */
export function getContrastingTextColor(hex) {
    return isColorLight(hex) ? "#000" : "#fff";
}
