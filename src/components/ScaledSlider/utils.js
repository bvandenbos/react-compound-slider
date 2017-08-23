function sortByVal(a, b) {
  if (a.val > b.val) {
    return 1;
  }

  if (b.val > a.val) {
    return -1;
  }

  return 0;
}

export function updateValues(values, active, nxt) {
  const index = values.findIndex(v => v.key === active);

  if (index !== -1) {
    const { key, val } = values[index];

    if (val !== nxt) {
      return [
        ...values.slice(0, index),
        { key, val: nxt },
        ...values.slice(index + 1)
      ].sort(sortByVal);
    }
  }

  return values;
}

export function getSliderDomain(slider, vertical) {
  if (!slider) {
    return [0, 0];
  }

  const s = slider.getBoundingClientRect();
  return vertical ? [s.top, s.bottom] : [s.left, s.right];
}

function precision(num) {
  const m = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  if (!m) {
    return 0;
  }

  return Math.max(0, (m[1] ? m[1].length : 0) - (m[2] ? +m[2] : 0));
}

export function getStepRange(min, max, step) {
  const fixed = precision(step);

  const pMin = +min.toFixed(fixed);
  const pMax = +max.toFixed(fixed);

  const range = [];

  let next = pMin;

  while (next <= pMax) {
    range.push(next);
    next = +(next + step).toFixed(fixed);
  }

  return range;
}
