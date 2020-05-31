import Animation from "../graphic/Animation";

export async function loadImage(imageFile) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = `assets/images/${imageFile}`;
  });
}

export async function loadSpec(specFile) {
  return fetch(`assets/specs/${specFile}`)
    .then(resp => resp.json());
}

export function loadAnimations(tileSet, animationsSpec) {
  return Object.entries(animationsSpec).reduce((map, [animName, animSpec]) => {
    map[animName] = new Animation(animSpec, tileSet);
    return map;
  }, {});
}
