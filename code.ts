figma.showUI(__html__);
figma.ui.resize(1100, 580);
figma.ui.onmessage = async (pluginMessage) => {
  try {
    await figma.loadFontAsync({ family: "CoFo Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Bebas Neue", style: "Book" });
    if (pluginMessage.content) {
      let duplicatedNodes = []
      duplicateAndModify(pluginMessage)
      const group = figma.group(duplicatedNodes, figma.currentPage);
      const frame = figma.createFrame()
      frame.resizeWithoutConstraints(group.width, group.height);
      frame.x = 100
      frame.y = 100
      group.children.forEach(child => {
          frame.appendChild(child)
      });
      figma.currentPage.appendChild(frame)
      frame.fills = [{
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
      opacity: 0
      }];
      frame.itemSpacing = 400
      frame.layoutMode = "VERTICAL"
      frame.primaryAxisSizingMode = "AUTO"
      frame.counterAxisSizingMode = "AUTO"
      figma.viewport.scrollAndZoomIntoView([frame])
      figma.viewport.scrollAndZoomIntoView([group])  
      function duplicateAndModify(info) {
        let rows = pluginMessage.content.split('\n')
        const componentNodeOneTextImage = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextAndLegalImage');
        const componentNodeOneTextBlue = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextAndLegalBlueBackground');
        const componentNodeTwoTextImage = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextTwoAndLegalImage');
        const componentNodeTwoTextBlue = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextTwoAndLegalBlueBackground');
        rows.forEach(row => {
          // console.log(row)
          let rowContents = row.split(';').filter(element => element !== "")
          // console.log(rowContents)
          if (rowContents.length == 3) {
            let duplicatedNode = componentNodeTwoTextBlue.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = rowContents[0]
              }        
              if (node.type === 'TEXT' && node.name === 'mainText2') {
                node.characters = rowContents[1]
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = rowContents[2]
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }        
              // if (node.name === 'shadowBox') {
              //   node.children.forEach((e: { children: { fills: { type: string; color: { r: number; g: number; b: number; }; opacity: number; }[]; }[]; }) => {
              //     e.children[0].fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
              //     });
              // }        
              // if (node.name === 'imagePP') {
              //   node.fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
              // }        
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)

          } else {
            let duplicatedNode = componentNodeOneTextImage.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = rowContents[0]
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = rowContents[1]
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }
              // if (node.name === 'shadowBox') {
              //   node.children.forEach((e: { children: { fills: { type: string; color: { r: number; g: number; b: number; }; opacity: number; }[]; }[]; }) => {
              //     e.children[0].fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
              //     });
              // }        
              // if (node.name === 'imagePP') {
              //   node.fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
              // }                
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)
          }
        });
      }
      } else {
        console.log(pluginMessage)
        const componentNodeOneTextImage = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextAndLegalImage');
        const componentNodeOneTextBlue = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextAndLegalBlueBackground');
        const componentNodeTwoTextImage = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextTwoAndLegalImage');
        const componentNodeTwoTextBlue = figma.currentPage.findOne(n => n.type === 'COMPONENT' && n.name === 'mainTextTwoAndLegalBlueBackground');
        if (pluginMessage.secondText !== "") {
          let duplicatedNodes = []
          duplicateAndModify(pluginMessage)
          const group = figma.group(duplicatedNodes, figma.currentPage);
          const frame = figma.createFrame()
          frame.resizeWithoutConstraints(group.width, group.height);
          frame.x = 100
          frame.y = 100
          group.children.forEach(child => {
              frame.appendChild(child)
          });
          figma.currentPage.appendChild(frame)
          frame.fills = [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          opacity: 0
          }];
          frame.itemSpacing = 400
          frame.layoutMode = "VERTICAL"
          frame.primaryAxisSizingMode = "AUTO"
          frame.counterAxisSizingMode = "AUTO"
          figma.viewport.scrollAndZoomIntoView([frame])
          figma.viewport.scrollAndZoomIntoView([group])
          function duplicateAndModify(info) {  
          if (figma.currentPage.selection.length > 0) {
            let duplicatedNode = componentNodeTwoTextImage.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = pluginMessage.text
              }        
              if (node.type === 'TEXT' && node.name === 'mainText2') {
                node.characters = pluginMessage.secondText
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = pluginMessage.description
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }        
              // if (node.name === 'shadowBox') {
              //   node.children.forEach((e: { children: { fills: { type: string; color: { r: number; g: number; b: number; }; opacity: number; }[]; }[]; }) => {
              //     e.children[0].fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
              //     });
              // }        
              if (node.name === 'imagePP') {
                const selectedImageFill = figma.currentPage.selection[0].fills.find((fill: { type: string; }) => fill.type === 'IMAGE')
                if (selectedImageFill) {
                  node.fills = [selectedImageFill]
                } 
                }        
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)
          } else {
            let duplicatedNode = componentNodeTwoTextBlue.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = pluginMessage.text
              }        
              if (node.type === 'TEXT' && node.name === 'mainText2') {
                node.characters = pluginMessage.secondText
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = pluginMessage.description
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }        
              if (node.name === 'shadowBox') {
                node.children.forEach((e: { children: { fills: { type: string; color: { r: number; g: number; b: number; }; opacity: number; }[]; }[]; }) => {
                  e.children[0].fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
                  });
              }        
              if (node.name === 'imagePP') {
                node.fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
                }        
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)
          }}
        } else {
          //HERE
          let duplicatedNodes = []
          duplicateAndModify(pluginMessage)
          const group = figma.group(duplicatedNodes, figma.currentPage);
          const frame = figma.createFrame()
          frame.resizeWithoutConstraints(group.width, group.height);
          frame.x = 100
          frame.y = 100
          group.children.forEach(child => {
              frame.appendChild(child)
          });
          figma.currentPage.appendChild(frame)
          frame.fills = [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          opacity: 0
          }];
          frame.itemSpacing = 400
          frame.layoutMode = "VERTICAL"
          frame.primaryAxisSizingMode = "AUTO"
          frame.counterAxisSizingMode = "AUTO"
          figma.viewport.scrollAndZoomIntoView([frame])
          figma.viewport.scrollAndZoomIntoView([group])
          function duplicateAndModify(info) {  
          if (figma.currentPage.selection.length > 0) {
            let duplicatedNode = componentNodeOneTextImage.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = pluginMessage.text
              }        
              if (node.type === 'TEXT' && node.name === 'mainText2') {
                node.characters = pluginMessage.secondText
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = pluginMessage.description
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }        
              if (node.name === 'imagePP') {
                const selectedImageFill = figma.currentPage.selection[0].fills.find((fill: { type: string; }) => fill.type === 'IMAGE')
                if (selectedImageFill) {
                  node.fills = [selectedImageFill]
                } 
                }        
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)
          } else {
            let duplicatedNode = componentNodeOneTextBlue.clone()
            const updateTextNodes = (node) => {
              if (node.type === 'TEXT' && node.name === 'mainText') {
                node.characters = pluginMessage.text
              }        
              if (node.type === 'TEXT' && node.name === 'Legal') {
                node.characters = pluginMessage.description
                if (node.characters.length > 1000){
                  node.fontSize = 28
                }
              }        
              if (node.name === 'shadowBox') {
                node.children.forEach((e: { children: { fills: { type: string; color: { r: number; g: number; b: number; }; opacity: number; }[]; }[]; }) => {
                  e.children[0].fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
                  });
              }        
              if (node.name === 'imagePP') {
                node.fills = [{ type: 'SOLID', color: { r: 0, g: 0.48, b: 0.98 }, opacity: 1 }]
                }        
              if("children" in node){
                for (const child of node.children) {                  
                  updateTextNodes(child)
                }
              }       
            }
            updateTextNodes(duplicatedNode)
            duplicatedNodes.push(duplicatedNode)
          }}
        }
    }
  } catch (error) {
    console.error("Error in plugin:", error)
  } finally {
    // figma.closePlugin()
  }
}
