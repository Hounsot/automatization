// This is the main code for the Figma plugin

// First, we need to define the plugin command
figma.showUI(__html__, { width: 240, height: 180 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
    await figma.loadFontAsync({ family: "CoFo Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Bebas Neue", style: "Book" });
    await figma.loadFontAsync({ family: "Bebas Neue", style: "Bold" });
    const frameWidth = msg.width;
    const frameHeight = msg.height;
    const legalText = msg.legal;
    const postText = msg.post;
    const legalFontSize = msg.fontSize;
    const aspectRatio = frameWidth/frameHeight;
    const logoCode = frameWidth/454*100;
    const aspectRatioCofecent = frameWidth > frameHeight ? 2.8 : 3.2;
    // Find the frame named "ExampleFrame"
    const exampleFrame = figma.currentPage.findOne(node => node.type === "FRAME" && node.name === "ExampleFrame") as FrameNode;
  
    if (exampleFrame) {
      function replaceFooterFrame(clonedFrame: FrameNode) {
        const legalNodes = clonedFrame.findAll(node => node.type === "TEXT" && node.name === "Legal") as TextNode[];
        legalNodes.forEach(legal => {
          legal.characters = legalTextWithoutMarkers;
          legal.fontSize = legalFontSize;      
          boldRanges.forEach(range => {
            legal.setRangeFontName(range.start, range.end, { family: "Bebas Neue", style: "Bold" });
          });
                  });
        const inlineFooter = clonedFrame.findOne(node => node.name === "inlineFooter") as FrameNode;
        const multipleLineFooter = clonedFrame.findOne(node => node.name === "multipleLineFooter") as FrameNode;
        multipleLineFooter.visible = false;
        const withLegalInlineHeight = inlineFooter.height;
        const inlineLegal = inlineFooter.findOne(node => node.type === "TEXT" && node.name === "Legal") as TextNode;
        // temp remove legal
        inlineLegal.visible = false;
        const withoutLegalInlineHeight = inlineFooter.height;
        inlineLegal.visible = true;
        console.log("C legal", withLegalInlineHeight)
        console.log("Without legal", withoutLegalInlineHeight)
        if (withLegalInlineHeight !== withoutLegalInlineHeight) {
          console.log("NE ВМЕСТИЛСЯ")
          inlineFooter.visible = false;
          multipleLineFooter.visible = true;
        } else {
          console.log("ВМЕСТИЛСЯ")
        }
    }
function findBoldRanges(text: string): Array<{ start: number, end: number }> {
    const boldRanges = [];
    const regex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[1].length;
        boldRanges.push({ start, end });
    }

    return boldRanges;
}
const resizeElement = (element: SceneNode, width: number, height: number) => {
  (element as any).resize(width, height);
};
    // Clone the frame
    const clonedFrame = exampleFrame.clone();
      // Apply the new dimensions to the frame
      clonedFrame.resize(frameWidth, frameHeight);
      const legalTextWithoutMarkers = msg.legal.replace(/\*\*/g, ''); // Remove markdown-like syntax
      const boldRanges = findBoldRanges(msg.legal);
      // Find the child element named "logo" inside the cloned frame
      const post = clonedFrame.findOne(node => node.type === "TEXT" && node.name === "post") as TextNode;
      const urbanLegal = clonedFrame.findOne(node => node.type === "FRAME" && node.name === "urbanLegal") as FrameNode;
      // const urbanLegal = clonedFrame.findOne(node => node.name === "urbanLegal") as SceneNode;
      // const logo = clonedFrame.findOne(node => node.name === "logo") as SceneNode;
      // const urban = clonedFrame.findOne(node => node.name === "urban") as SceneNode;
      const logos = clonedFrame.findAll(node => node.name === "logo") as SceneNode[];
      const logoWidthPercentFromOriginal = logoCode/aspectRatioCofecent/(aspectRatio + 0.8) * 1.9;
      // const newLogoWidth = 454/100*logoWidthPercentFromOriginal;
      // const newLogoHeight = newLogoWidth/7.584;
      const newLogoWidth = 454/100*logoWidthPercentFromOriginal;
      const newLogoHeight = newLogoWidth/7.584;
      const newUrbanHeight = newLogoHeight/0.8529;
      const newUrbanWidth = newUrbanHeight * 0.633;
      const paddingValue = newLogoHeight * 2;
      const postFontSize = newLogoHeight * 1.995
      const inlineFooterLength = frameWidth - 2 * paddingValue - newLogoWidth;
      post.characters = postText;
      post.fontSize = postFontSize;
      clonedFrame.paddingTop = paddingValue;
      clonedFrame.paddingRight = paddingValue;
      clonedFrame.paddingBottom = paddingValue;
      clonedFrame.paddingLeft = paddingValue;   
      logos.forEach(logo => {
        resizeElement(logo, newLogoWidth, newLogoHeight);
    });    
      const urbans = clonedFrame.findAll(node => node.name === "urban") as SceneNode[];
      urbans.forEach(urban => {
        resizeElement(urban, newUrbanWidth, newUrbanHeight);
    });    
    (urbanLegal as any).resize(inlineFooterLength * 1, urbanLegal.height);
    replaceFooterFrame(clonedFrame);    
      // (logo as any).resize(newLogoWidth, newLogoHeight);
      // const newUrbanHeight = newLogoHeight/0.8529;
      // const newUrbanWidth = newUrbanHeight *0.633;
      // (urban as any).resize(newUrbanWidth, newUrbanHeight);
      // console.log(frameWidth - 2 * paddingValue - newLogoWidth - newUrbanWidth);
      figma.currentPage.appendChild(clonedFrame);
    } else {
      figma.notify("ExampleFrame not found.");
    }

  // Close the plugin
  figma.closePlugin();
};

// This is the UI code
const html = `
<div>
  <label for="frameWidth">Frame Width:</label>
  <input type="number" id="frameWidth" name="frameWidth" min="0">
  <label for="frameHeight">Frame Height:</label>
  <input type="number" id="frameHeight" name="frameHeight" min="0">
  <label for="description">Legal:</label>
  <textarea id="description" rows="4" placeholder="Project declaration..."></textarea>
  <label for="post">Legal:</label>
  <textarea id="post" rows="4" placeholder="Post title..."></textarea>
  <label for="legalFontSize">Legal Font Size:</label>
  <input type="number" id="legalFontSize" name="legalFontSize" min="1">
  <button id="resizeButton">Resize Frame and Logo</button>
</div>
  <script>
  resizeButton.onclick = () => {
    const legalText = document.getElementById("description").value;
    const postText = document.getElementById("post").value;
    const frameWidth = parseFloat(document.getElementById('frameWidth').value);
    const frameHeight = parseFloat(document.getElementById('frameHeight').value);
    const legalFontSize = parseFloat(document.getElementById('legalFontSize').value);
    parent.postMessage({ pluginMessage: {post: postText, legal: legalText, width: frameWidth, height: frameHeight, fontSize: legalFontSize } }, '*');
  };
    </script>
`;

// Set the HTML for the UI
figma.showUI(html);
