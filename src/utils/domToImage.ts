const getStyles = (node: Element): string => {
  let styleString = '';
  const style = window.getComputedStyle(node);
  for (let i = 0; i < style.length; i++) {
    const key = style[i];
    styleString += `${key}: ${style.getPropertyValue(key)}; `;
  }
  // Also copy inline styles
  if (node instanceof HTMLElement && node.style.cssText) {
    styleString += node.style.cssText;
  }
  return styleString;
}

const cloneNodeWithStyles = async (node: HTMLElement): Promise<HTMLElement> => {
    const clone = node.cloneNode(false) as HTMLElement;
    // Copy styles
    clone.setAttribute('style', getStyles(node));

    // Handle children
    const children = Array.from(node.childNodes);
    for (const child of children) {
        if (child instanceof HTMLElement) {
            clone.appendChild(await cloneNodeWithStyles(child));
        } else {
            clone.appendChild(child.cloneNode(true));
        }
    }
    return clone;
}

const toSvg = async (node: HTMLElement): Promise<string> => {
  const { width, height } = node.getBoundingClientRect();
  const clonedNode = await cloneNodeWithStyles(node);
  clonedNode.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

  const html = new XMLSerializer().serializeToString(clonedNode);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject x="0" y="0" width="100%" height="100%">
        ${html}
      </foreignObject>
    </svg>
  `;
}

export const toJpeg = (node: HTMLElement): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const svgData = await toSvg(node);
      const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const { width, height } = node.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Fill background with white, otherwise it will be transparent
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.95)); // 0.95 quality
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      img.onerror = (error) => {
        console.error('Image loading error:', error);
        reject(new Error('Failed to load SVG image'));
      };
      img.src = svgUrl;
    } catch (error) {
      console.error('Error in toJpeg function:', error);
      reject(error);
    }
  });
};
