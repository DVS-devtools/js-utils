import Globals from '../globals';

export default function (level, ...args) {
    if (Globals.enable && !!Globals.levels[level]) {
        try {
            Globals.emit[level](args);
        } catch (e) {}
    }
}
