import { DOMLoadedPromise, cards, metrics, pagespeedCard } from "./init.js";
import scrollReveal from "./scrollReveal.js";
import glowingCursor from "./glowingCursor.js";

await DOMLoadedPromise;

scrollReveal(cards, metrics);
glowingCursor();
