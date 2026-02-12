//orginal code this is

// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import {
//   Type,
//   Trash2,
//   Bold,
//   Italic,
//   Underline,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
// } from "lucide-react";
// import { useCanvas } from "@/context/context";
// import { IText } from "fabric";

// const FONT_FAMILIES = [
//   "Arial",
//   "Arial Black",
//   "Helvetica",
//   "Times New Roman",
//   "Courier New",
//   "Georgia",
//   "Verdana",
//   "Comic Sans MS",
//   "Impact",
//   "brush Script MT",
//   "Tahoma",
//   "Monoton",
// ];

// const FONT_SIZES = { min: 8, max: 120, default: 20 };

// export function TextControls() {
//   const { canvasEditor } = useCanvas();
//   const [selectedText, setSelectedText] = useState(null);
//   const [fontFamily, setFontFamily] = useState("Arial");
//   const [fontSize, setFontSize] = useState(FONT_SIZES.default);
//   const [textColor, setTextColor] = useState("#000000");
//   const [textAlign, setTextAlign] = useState("left");
//   const [_, setChanged] = useState(0);

//   // Check if selected object is text
//   const updateSelectedText = () => {
//     if (!canvasEditor) return;
//     const activeObject = canvasEditor.getActiveObject();
//     if (activeObject && activeObject.type === "i-text") {
//       setSelectedText(activeObject);
//       setFontFamily(activeObject.fontFamily || "Arial");
//       setFontSize(activeObject.fontSize || FONT_SIZES.default);
//       setTextColor(activeObject.fill || "#000000");
//       setTextAlign(activeObject.textAlign || "left");
//     } else {
//       setSelectedText(null);
//     }
//   };

//   // Listen for selection changes
//   useEffect(() => {
//     if (!canvasEditor) return;

//     updateSelectedText();

//     const handleSelectionCreated = () => updateSelectedText();
//     const handleSelectionUpdated = () => updateSelectedText();
//     const handleSelectionCleared = () => setSelectedText(null);

//     canvasEditor.on("selection:created", handleSelectionCreated);
//     canvasEditor.on("selection:updated", handleSelectionUpdated);
//     canvasEditor.on("selection:cleared", handleSelectionCleared);

//     return () => {
//       canvasEditor.off("selection:created", handleSelectionCreated);
//       canvasEditor.off("selection:updated", handleSelectionUpdated);
//       canvasEditor.off("selection:cleared", handleSelectionCleared);
//     };
//   }, [canvasEditor]);

//   // Add new text to canvas
//   const addText = () => {
//     if (!canvasEditor) return;

//     const text = new IText("Edit this text", {
//       left: canvasEditor.width / 2,
//       top: canvasEditor.height / 2,
//       originX: "center",
//       originY: "center",
//       fontFamily,
//       fontSize: FONT_SIZES.default,
//       fill: textColor,
//       textAlign,
//       editable: true,
//       selectable: true,
//     });

//     canvasEditor.add(text);
//     canvasEditor.setActiveObject(text);
//     canvasEditor.requestRenderAll();

//     setTimeout(() => {
//       text.enterEditing();
//       text.selectAll();
//     }, 100);
//   };

//   // Delete selected text
//   const deleteSelectedText = () => {
//     if (!canvasEditor || !selectedText) return;

//     canvasEditor.remove(selectedText);
//     canvasEditor.requestRenderAll();
//     setSelectedText(null);
//   };

//   // Apply font family to selected text
//   const applyFontFamily = (family) => {
//     if (!selectedText) return;
//     setFontFamily(family);
//     selectedText.set("fontFamily", family);
//     canvasEditor.requestRenderAll();
//   };

//   // Apply font size to selected text
//   const applyFontSize = (size) => {
//     if (!selectedText) return;
//     const newSize = Array.isArray(size) ? size[0] : size;
//     setFontSize(newSize);
//     selectedText.set("fontSize", newSize);
//     canvasEditor.requestRenderAll();
//   };

//   // Apply text alignment to selected text
//   const applyTextAlign = (alignment) => {
//     if (!selectedText) return;
//     setTextAlign(alignment);
//     selectedText.set("textAlign", alignment);
//     canvasEditor.requestRenderAll();
//   };

//   // Apply text color to selected text
//   const applyTextColor = (color) => {
//     if (!selectedText) return;
//     setTextColor(color);
//     selectedText.set("fill", color);
//     canvasEditor.requestRenderAll();
//   };

//   // Toggle text formatting
//   const toggleFormat = (format) => {
//     if (!selectedText) return;

//     switch (format) {
//       case "bold": {
//         const current = selectedText.fontWeight || "normal";
//         selectedText.set("fontWeight", current === "bold" ? "normal" : "bold");
//         break;
//       }
//       case "italic": {
//         const current = selectedText.fontStyle || "normal";
//         selectedText.set(
//           "fontStyle",
//           current === "italic" ? "normal" : "italic"
//         );
//         break;
//       }
//       case "underline": {
//         const current = selectedText.underline || false;
//         selectedText.set("underline", !current);
//         break;
//       }
//     }

//     canvasEditor.requestRenderAll();
//     setChanged((c) => c + 1); // 👈 force rerender to update buttons
//   };

//   if (!canvasEditor) {
//     return (
//       <div className="p-4">
//         <p className="text-white/70 text-sm">Canvas not ready</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Add Text Button */}
//       <div className="space-y-4">
//         <div>
//           <h3 className="text-sm font-medium text-white mb-2">Add Text</h3>
//           <p className="text-xs text-white/70 mb-4">
//             Click to add editable text to your canvas
//           </p>
//         </div>
//         <Button onClick={addText} className="w-full" variant="primary">
//           <Type className="h-4 w-4 mr-2" />
//           Add Text
//         </Button>
//       </div>

//       {/* Text Editing Controls - Show only when text is selected */}
//       {selectedText && (
//         <div className="border-t border-white/10 pt-6">
//           <h3 className="text-sm font-medium text-white mb-4">
//             Edit Selected Text
//           </h3>

//           {/* Font Family */}
//           <div className="space-y-2 mb-4">
//             <label className="text-xs text-white/70">Font Family</label>
//             <select
//               value={fontFamily}
//               onChange={(e) => applyFontFamily(e.target.value)}
//               className="w-full px-3 py-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
//             >
//               {FONT_FAMILIES.map((font) => (
//                 <option key={font} value={font}>
//                   {font}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Font Size Slider */}
//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between items-center">
//               <label className="text-xs text-white/70">Font Size</label>
//               <span className="text-xs text-white/70">{fontSize}px</span>
//             </div>
//             <Slider
//               value={[fontSize]}
//               onValueChange={applyFontSize}
//               min={FONT_SIZES.min}
//               max={FONT_SIZES.max}
//               step={1}
//               className="w-full"
//             />
//           </div>

//           {/* Text Alignment */}
//           <div className="space-y-2 mb-4">
//             <label className="text-xs text-white/70">Text Alignment</label>
//             <div className="grid grid-cols-4 gap-1">
//               {[
//                 ["left", AlignLeft],
//                 ["center", AlignCenter],
//                 ["right", AlignRight],
//                 ["justify", AlignJustify],
//               ].map(([align, Icon]) => (
//                 <Button
//                   key={align}
//                   onClick={() => applyTextAlign(align)}
//                   variant={textAlign === align ? "default" : "outline"}
//                   size="sm"
//                   className="p-2"
//                 >
//                   <Icon className="h-4 w-4" />
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Text Color */}
//           <div className="space-y-2 mb-4">
//             <label className="text-xs text-white/70">Text Color</label>
//             <div className="flex gap-2">
//               <input
//                 type="color"
//                 value={textColor}
//                 onChange={(e) => applyTextColor(e.target.value)}
//                 className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
//               />
//               <Input
//                 value={textColor}
//                 onChange={(e) => applyTextColor(e.target.value)}
//                 placeholder="#000000"
//                 className="flex-1 bg-slate-700 border-white/20 text-white text-sm"
//               />
//             </div>
//           </div>

//           {/* Text Formatting */}
//           <div className="space-y-2 mb-4">
//             <label className="text-xs text-white/70">Formatting</label>
//             <div className="flex gap-2">
//               <Button
//                 onClick={() => toggleFormat("bold")}
//                 variant={
//                   selectedText.fontWeight === "bold" ? "default" : "outline"
//                 }
//                 size="sm"
//                 className="flex-1"
//               >
//                 <Bold className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => toggleFormat("italic")}
//                 variant={
//                   selectedText.fontStyle === "italic" ? "default" : "outline"
//                 }
//                 size="sm"
//                 className="flex-1"
//               >
//                 <Italic className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => toggleFormat("underline")}
//                 variant={selectedText.underline ? "default" : "outline"}
//                 size="sm"
//                 className="flex-1"
//               >
//                 <Underline className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Delete Text */}
//           <Button
//             onClick={deleteSelectedText}
//             variant="outline"
//             className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete Text
//           </Button>
//         </div>
//       )}

//       {/* Instructions */}
//       <div className="bg-slate-700/30 rounded-lg p-3">
//         <p className="text-xs text-white/70">
//           <strong>Double-click</strong> any text to edit it directly on canvas.
//           <br />
//           <strong>Select</strong> text to see formatting options here.
//         </p>
//       </div>
//     </div>
//   );
// }

// this is  updated code containing 2d and 3d effects
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Type,
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";
import { useCanvas } from "@/context/context";
import { IText } from "fabric";

const FONT_FAMILIES = [
  "Arial",
  "Arial Black",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Comic Sans MS",
  "Impact",
  "Brush Script MT",
  "Tahoma",
  "Monoton",
  
];

const FONT_SIZES = { min: 8, max: 120, default: 20 };

const TEXT_EFFECTS = [
  { name: "None", value: "none" },
  { name: "Shadow", value: "shadow" },
  { name: "Outline", value: "outline" },
  { name: "Neon", value: "neon" },
  { name: "Emboss", value: "emboss" },
  { name: "Gradient", value: "gradient" },
  { name: "Chrome", value: "chrome" },
  { name: "Fire", value: "fire" },
  { name: "Ice", value: "ice" },
  { name: "Gold", value: "gold" },
];

const STYLE_3D_EFFECTS = [
  { name: "None", value: "none" },
  { name: "Extrude", value: "extrude" },
  { name: "Bevel", value: "bevel" },
  { name: "Perspective", value: "perspective" },
  { name: "Isometric", value: "isometric" },
  { name: "Depth", value: "depth" },
  { name: "Block", value: "block" },
  { name: "Ocean", value: "ocean" },
  { name: "threeLayer3D", value: "threeLayer" },
  { name: "colorfull", value: "colorfull" },
];

export function TextControls() {
  const { canvasEditor } = useCanvas();
  const [selectedText, setSelectedText] = useState(null);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(FONT_SIZES.default);
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState("left");
  const [effect, setEffect] = useState("none");
  const [effect3D, setEffect3D] = useState("none");
  const [shadowIntensity, setShadowIntensity] = useState(5);
  const [glowIntensity, setGlowIntensity] = useState(10);
  const [_, setChanged] = useState(0);

  // Check if selected object is text
  const updateSelectedText = () => {
    if (!canvasEditor) return;
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      setSelectedText(activeObject);
      setFontFamily(activeObject.fontFamily || "Arial");
      setFontSize(activeObject.fontSize || FONT_SIZES.default);
      setTextColor(activeObject.fill || "#000000");
      setTextAlign(activeObject.textAlign || "left");
    } else {
      setSelectedText(null);
    }
  };

  // Listen for selection changes
  useEffect(() => {
    if (!canvasEditor) return;

    updateSelectedText();

    const handleSelectionCreated = () => updateSelectedText();
    const handleSelectionUpdated = () => updateSelectedText();
    const handleSelectionCleared = () => setSelectedText(null);

    canvasEditor.on("selection:created", handleSelectionCreated);
    canvasEditor.on("selection:updated", handleSelectionUpdated);
    canvasEditor.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvasEditor.off("selection:created", handleSelectionCreated);
      canvasEditor.off("selection:updated", handleSelectionUpdated);
      canvasEditor.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvasEditor]);

  // Apply 2D effects
  const applyEffect = (effectType) => {
    if (!selectedText) return;
    setEffect(effectType);

    const effects = {
      shadow: () => {
        selectedText.set({
          shadow: {
            color: "rgba(0,0,0,0.5)",
            blur: shadowIntensity,
            offsetX: shadowIntensity,
            offsetY: shadowIntensity,
          },
        });
      },
      outline: () => {
        selectedText.set({
          stroke: "#000000",
          strokeWidth: 2,
          paintFirst: "stroke",
        });
      },
      emboss: () => {
        // 2D Emboss effect
        selectedText.set({
          fill: "#6b6b6b", // Light metallic base
          stroke: "#ffffff", // Top-left highlight
          strokeWidth: 2,
          shadow: {
            color: "#555555", // Dark bottom-right shadow for depth
            blur: 2,
            offsetX: 3,
            offsetY: 3,
          },
        });
        canvasEditor.requestRenderAll();
      },
      neon: () => {
        selectedText.set({
          fill: textColor,
          shadow: {
            color: textColor,
            blur: glowIntensity,
            offsetX: 0,
            offsetY: 0,
            offsetX: shadowIntensity,
            offsetY: shadowIntensity,
          },
          stroke: textColor,
          strokeWidth: 1,
        });
        canvasEditor.requestRenderAll();
      },

      gradient: () => {
        // Replace gradient with solid rainbow-like effect using shadow + stroke
        selectedText.set({
          fill: "#988196ff", // solid color
          stroke: "#61616bff", // outline color
          strokeWidth: 2,
          shadow: {
            color: "#878987ff",
            blur: 10,
            offsetX: 2,
            offsetY: 2,
          },
        });
        canvasEditor.requestRenderAll();
      },

      chrome: () => {
        // Simulate chrome effect using stroke + shadow
        selectedText.set({
          fill: "#cccccc",
          stroke: "#666666",
          strokeWidth: 1,
          shadow: {
            color: "#ffffff",
            blur: 15,
            offsetX: 0,
            offsetY: 0,
          },
        });
        canvasEditor.requestRenderAll();
      },
      fire: () => {
        // Solid fiery color with glow shadow
        selectedText.set({
          fill: "#ff4500",
          stroke: "#ff6347",
          strokeWidth: 1,
          shadow: {
            color: "#ff8c00",
            blur: 20,
            offsetX: 0,
            offsetY: 0,
          },
        });
        canvasEditor.requestRenderAll();
      },
      ice: () => {
        // Icy solid color + light shadow
        selectedText.set({
          fill: "#87ceeb",
          stroke: "#b0e0e6",
          strokeWidth: 1,
          shadow: {
            color: "#e0f6ff",
            blur: 10,
            offsetX: 0,
            offsetY: 0,
          },
        });
        canvasEditor.requestRenderAll();
      },

      gold: () => {
        // Golden solid color + stroke
        selectedText.set({
          fill: "#ffd700",
          stroke: "#b8860b",
          strokeWidth: 2,
          shadow: {
            color: "#ffec8b",
            blur: 8,
            offsetX: 0,
            offsetY: 0,
          },
        });
        canvasEditor.requestRenderAll();
      },
    };

    if (effects[effectType]) {
      effects[effectType]();
    } else if (effectType === "none") {
      selectedText.set({
        shadow: null,
        stroke: null,
        strokeWidth: 0,
        fill: textColor,
      });
    }

    canvasEditor.requestRenderAll();
  };

  // Apply 3D effects
  const apply3DEffect = (effectType) => {
    if (!selectedText) return;
    setEffect3D(effectType);

    const effects3D = {
      extrude: () => {
        selectedText.set({
          shadow: {
            color: "rgba(0,0,0,0.8)",
            blur: 0,
            offsetX: 3,
            offsetY: 3,
          },
          stroke: "#333",
          strokeWidth: 2,
        });
      },
      bevel: () => {
        selectedText.set({
          shadow: {
            color: "rgba(255,255,255,0.8)",
            blur: 2,
            offsetX: -1,
            offsetY: -1,
          },
          stroke: "#000",
          strokeWidth: 1,
        });
      },
      perspective: () => {
        selectedText.set({
          skewX: -15,
          shadow: {
            color: "rgba(0,0,0,0.6)",
            blur: 5,
            offsetX: 10,
            offsetY: 5,
          },
        });
      },
      isometric: () => {
        selectedText.set({
          skewX: 30,
          skewY: -30,
          shadow: {
            color: "rgba(0,0,0,0.5)",
            blur: 0,
            offsetX: 5,
            offsetY: 5,
          },
        });
      },
      depth: () => {
        selectedText.set({
          shadow: {
            color: "rgba(0,0,0,0.3)",
            blur: 0,
            offsetX: 5,
            offsetY: 5,
          },
        });
      },
      ocean: () => {
        selectedText.set({
          fill: "#1e90ff",
          stroke: "#00008b",
          strokeWidth: 2,
          shadow: {
            color: "#4682b4",
            blur: 8,
            offsetX: 3,
            offsetY: 3,
          },
        });
        canvasEditor.requestRenderAll();
      },
      threeLayer3D: () => {
        selectedText.set({
          fill: "#ff6347", // Top/front color
          stroke: "#cd5c5c", // Middle layer effect
          strokeWidth: 2,
          shadow: {
            color: "#8b0000", // Back layer shadow
            blur: 0,
            offsetX: 4, // Back layer offsetX
            offsetY: 4, // Back layer offsetY
          },
        });
        canvasEditor.requestRenderAll();
      },
      colorfull: () => {
        selectedText.set({
          fill: "#ff4500", // Orange front
          stroke: "#ffdd00", // Yellow middle
          strokeWidth: 2,
          shadow: {
            color: "#00bfff", // Blue back
            blur: 0,
            offsetX: 5,
            offsetY: 5, // Vertical 3D offset
          },
        });
        canvasEditor.requestRenderAll();
      },

      block: () => {
        selectedText.set({
          stroke: "#000",
          strokeWidth: 3,
          shadow: {
            color: "rgba(0,0,0,0.8)",
            blur: 0,
            offsetX: 8,
            offsetY: 8,
          },
        });
      },
    };

    if (effects3D[effectType]) {
      effects3D[effectType]();
    } else if (effectType === "none") {
      selectedText.set({
        skewX: 0,
        skewY: 0,
        shadow: null,
        stroke: null,
        strokeWidth: 0,
      });
    }

    canvasEditor.requestRenderAll();
  };

  // Add new text to canvas
  const addText = () => {
    if (!canvasEditor) return;

    const text = new IText("Edit this text", {
      left: canvasEditor.width / 2,
      top: canvasEditor.height / 2,
      originX: "center",
      originY: "center",
      fontFamily,
      fontSize: FONT_SIZES.default,
      fill: textColor,
      textAlign,
      editable: true,
      selectable: true,
    });

    canvasEditor.add(text);
    canvasEditor.setActiveObject(text);
    canvasEditor.requestRenderAll();

    setTimeout(() => {
      text.enterEditing();
      text.selectAll();
    }, 100);
  };

  // Delete selected text
  const deleteSelectedText = () => {
    if (!canvasEditor || !selectedText) return;

    canvasEditor.remove(selectedText);
    canvasEditor.requestRenderAll();
    setSelectedText(null);
  };

  // Apply font family to selected text
  const applyFontFamily = (family) => {
    if (!selectedText) return;
    setFontFamily(family);
    selectedText.set("fontFamily", family);
    canvasEditor.requestRenderAll();
  };

  // Apply font size to selected text
  const applyFontSize = (size) => {
    if (!selectedText) return;
    const newSize = Array.isArray(size) ? size[0] : size;
    setFontSize(newSize);
    selectedText.set("fontSize", newSize);
    canvasEditor.requestRenderAll();
  };

  // Apply text alignment to selected text
  const applyTextAlign = (alignment) => {
    if (!selectedText) return;
    setTextAlign(alignment);
    selectedText.set("textAlign", alignment);
    canvasEditor.requestRenderAll();
  };

  // Apply text color to selected text
  const applyTextColor = (color) => {
    if (!selectedText) return;
    setTextColor(color);
    selectedText.set("fill", color);
    canvasEditor.requestRenderAll();
  };

  // Toggle text formatting
  const toggleFormat = (format) => {
    if (!selectedText) return;

    switch (format) {
      case "bold": {
        const current = selectedText.fontWeight || "normal";
        selectedText.set("fontWeight", current === "bold" ? "normal" : "bold");
        break;
      }
      case "italic": {
        const current = selectedText.fontStyle || "normal";
        selectedText.set(
          "fontStyle",
          current === "italic" ? "normal" : "italic"
        );
        break;
      }
      case "underline": {
        const current = selectedText.underline || false;
        selectedText.set("underline", !current);
        break;
      }
    }

    canvasEditor.requestRenderAll();
    setChanged((c) => c + 1); // 👈 force rerender to update buttons
  };

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-white/70 text-sm">Canvas not ready</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Text Button */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-white mb-2">Add Text</h3>
          <p className="text-xs text-white/70 mb-4">
            Click to add editable text with amazing effects
          </p>
        </div>
        <Button onClick={addText} className="w-full" variant="primary">
          <Type className="h-4 w-4 mr-2" />
          Add Text
        </Button>
      </div>

      {/* Text Editing Controls - Show only when text is selected */}
      {selectedText && (
        <div className="border-t border-white/10 pt-6 space-y-6">
          <h3 className="text-sm font-medium text-white mb-4">
            Edit Selected Text
          </h3>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-xs text-white/70">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => applyFontFamily(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/70">Font Size</label>
              <span className="text-xs text-white/70">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={applyFontSize}
              min={FONT_SIZES.min}
              max={FONT_SIZES.max}
              step={1}
              className="w-full"
            />
          </div>

          {/* Text Alignment */}
          <div className="space-y-2">
            <label className="text-xs text-white/70">Text Alignment</label>
            <div className="grid grid-cols-4 gap-1">
              {[
                ["left", AlignLeft],
                ["center", AlignCenter],
                ["right", AlignRight],
                ["justify", AlignJustify],
              ].map(([align, Icon]) => (
                <Button
                  key={align}
                  onClick={() => applyTextAlign(align)}
                  variant={textAlign === align ? "default" : "outline"}
                  size="sm"
                  className="p-2"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <label className="text-xs text-white/70">Text Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => applyTextColor(e.target.value)}
                className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <Input
                value={textColor}
                onChange={(e) => applyTextColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-slate-700 border-white/20 text-white text-sm"
              />
            </div>
          </div>

          {/* Text Formatting */}
          <div className="space-y-2">
            <label className="text-xs text-white/70">Formatting</label>
            <div className="flex gap-2">
              <Button
                onClick={() => toggleFormat("bold")}
                variant={
                  selectedText.fontWeight === "bold" ? "default" : "outline"
                }
                size="sm"
                className="flex-1"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => toggleFormat("italic")}
                variant={
                  selectedText.fontStyle === "italic" ? "default" : "outline"
                }
                size="sm"
                className="flex-1"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => toggleFormat("underline")}
                variant={selectedText.underline ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 2D Effects */}
          <div className="space-y-2">
            <label className="text-xs text-white/70 flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              2D Effects
            </label>
            <select
              value={effect}
              onChange={(e) => applyEffect(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
            >
              {TEXT_EFFECTS.map((eff) => (
                <option key={eff.value} value={eff.value}>
                  {eff.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3D Effects */}
          <div className="space-y-2">
            <label className="text-xs text-white/70 flex items-center gap-2">
              <Layers className="h-3 w-3" />
              3D Effects
            </label>
            <select
              value={effect3D}
              onChange={(e) => apply3DEffect(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-white/20 rounded text-white text-sm"
            >
              {STYLE_3D_EFFECTS.map((eff) => (
                <option key={eff.value} value={eff.value}>
                  {eff.name}
                </option>
              ))}
            </select>
          </div>

          {/* Effect Intensity Controls */}
          {(effect === "shadow" || effect === "neon") && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-white/70">
                    Shadow Intensity
                  </label>
                  <span className="text-xs text-white/70">
                    {shadowIntensity}
                  </span>
                </div>
                <Slider
                  value={[shadowIntensity]}
                  onValueChange={(value) => {
                    setShadowIntensity(value[0]);
                    applyEffect(effect);
                  }}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {effect === "neon" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-white/70">
                      Glow Intensity
                    </label>
                    <span className="text-xs text-white/70">
                      {glowIntensity}
                    </span>
                  </div>
                  <Slider
                    value={[glowIntensity]}
                    onValueChange={(value) => {
                      setGlowIntensity(value[0]);
                      applyEffect(effect);
                    }}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Delete Text */}
          <Button
            onClick={deleteSelectedText}
            variant="outline"
            className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Text
          </Button>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-slate-700/30 rounded-lg p-3">
        <p className="text-xs text-white/70">
          <strong>Double-click</strong> any text to edit it directly on canvas.
          <br />
          <strong>Select</strong> text to see formatting options and effects.
          <br />
          <strong>Experiment</strong> with animations and 3D effects for
          stunning results!
        </p>
      </div>
    </div>
  );
}
