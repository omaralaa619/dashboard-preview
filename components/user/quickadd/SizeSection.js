import { X } from "lucide-react";
import React, { useEffect } from "react";

const SizeSection = ({
  variants = [],
  sizes = [],
  colors = [],
  selectedColor,
  setSelectedColor,
  selectedColorName,
  setSelectedColorName,
  size,
  setSize,
}) => {
  const hasColors = variants.some((v) => v.colorHex);

  // Build color options
  const colorOptions = hasColors
    ? colors.length
      ? colors
      : [...new Set(variants.map((v) => v.colorHex).filter(Boolean))].map(
          (hex) => ({ color: hex, name: hex }),
        )
    : [];

  // Generic stock checker
  const isInStock = (checkSize, checkColor) =>
    variants.some(
      (v) =>
        v.stock > 0 &&
        (!checkSize || v.size === checkSize) &&
        (!checkColor || v.colorHex === checkColor),
    );

  // Get color name
  const getColorName = (hex) =>
    colors.find((c) => c.color === hex)?.name || hex;

  // ✅ Initial size selection (runs once on mount)
  useEffect(() => {
    if (!variants.length) return;

    if (hasColors) {
      // If no color selected yet, pick first in-stock color
      const firstAvailableVariant = variants.find((v) => v.stock > 0);

      if (firstAvailableVariant) {
        setSelectedColor(firstAvailableVariant.colorHex);
        setSelectedColorName(firstAvailableVariant.colorName);
        setSize(firstAvailableVariant.size);
      }
    } else {
      // No colors → just pick first available size
      const firstAvailableVariant = variants.find((v) => v.stock > 0);

      if (firstAvailableVariant) {
        setSize(firstAvailableVariant.size);
      }
    }
  }, []);

  // Auto select first available color & size
  useEffect(() => {
    if (hasColors) {
      if (!selectedColor) {
        const firstColor = colorOptions.find((c) => isInStock(null, c.color));
        console.log("firsstsstttt col", firstColor);

        if (firstColor) {
          setSelectedColor(firstColor.color);

          setSelectedColorName(firstColor.name);
        }
      }

      if (!isInStock(size, selectedColor)) {
        const firstVariant = variants.find(
          (v) => v.colorHex === selectedColor && v.stock > 0,
        );
        setSize(firstVariant?.size || "");
        console.log(firstVariant);
      }
    } else {
      if (!isInStock(size)) {
        const firstVariant = variants.find((v) => v.stock > 0);
        setSize(firstVariant?.size || "");
        console.log(firstVariant);
      }
    }
  }, [variants, selectedColor]);

  return (
    <>
      {/* -------- Sizes -------- */}
      <p className="text-base text-neutral-500 mb-2">
        Size: <span className="text-black ml-1">{size}</span>
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {sizes.map((label) => {
          const disabled = hasColors
            ? !isInStock(label, selectedColor)
            : !isInStock(label);

          return (
            <label
              key={label}
              className={`relative px-4 py-2 rounded-full border-2 text-sm cursor-pointer transition ${
                size === label ? "border-black" : "border-neutral-200"
              } ${disabled ? "pointer-events-none opacity-50" : ""}`}
            >
              {disabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <X size={18} />
                </div>
              )}

              <input
                type="radio"
                hidden
                value={label}
                checked={size === label}
                onChange={() => setSize(label)}
              />
              {label}
            </label>
          );
        })}
      </div>

      {/* -------- Colors -------- */}
      {hasColors && (
        <div className="mb-6">
          <p className="mb-2">
            Color: <span className="font-normal">{selectedColorName}</span>
          </p>

          <div className="flex gap-3">
            {colorOptions.map((c) => {
              const disabled = !isInStock(null, c.color);

              return (
                <label key={c.color} className="relative cursor-pointer">
                  <input
                    type="radio"
                    hidden
                    checked={selectedColor === c.color}
                    disabled={disabled}
                    onClick={() => console.log(c.color)}
                    onChange={() => {
                      setSelectedColor(c.color);
                      setSelectedColorName(c.name);
                    }}
                  />

                  <span
                    className={`block w-6 h-6 rounded-full border-2 ${
                      selectedColor === c.color
                        ? "border-black"
                        : "border-neutral-300"
                    } ${disabled ? "opacity-40" : ""}`}
                    style={{ background: c.color }}
                  >
                    {disabled && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <X size={12} color="#fff" />
                      </div>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SizeSection;
