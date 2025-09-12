import React from "react";

import { MenuDomainModel } from "../domain/MenuDomainModel";

export type TVMenuPreviewProps = {
  menu: MenuDomainModel;
  layoutType?: "coffee-shop" | "restaurant" | "modern" | "fast-food";
  showAnimations?: boolean;
};

export const TVMenuPreview: React.FC<TVMenuPreviewProps> = ({
  menu,
  layoutType = "coffee-shop",
  showAnimations = false,
}) => {
  const getLayoutStyles = () => {
    switch (layoutType) {
      case "coffee-shop":
        return {
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          color: "#2c3e50",
          fontFamily: "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
        };
      case "restaurant":
        return {
          background: "#1a1a1a",
          color: "#ffffff",
          fontFamily: "'Playfair Display', serif",
        };
      case "modern":
        return {
          background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
        };
      case "fast-food":
        return {
          background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
          color: "#2c2c2c",
          fontFamily: "'Poppins', sans-serif",
        };
      default:
        return {
          background: "#f8f9fa",
          color: "#2c3e50",
          fontFamily: "'SF Pro Display', Arial, sans-serif",
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        ...layoutStyles,
        borderRadius: 24,
        overflow: "hidden",
        margin: "0 auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        padding: 48,
        display: "flex",
        flexDirection: "column",
      }}
      className={showAnimations ? "animate-fade-in" : ""}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 54,
            fontWeight: "700",
            margin: 0,
            letterSpacing: "-0.02em",
            textShadow:
              layoutType === "restaurant"
                ? "2px 2px 4px rgba(0,0,0,0.3)"
                : "none",
          }}
          className={showAnimations ? "animate-slide-down" : ""}
        >
          {menu.name}
        </h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          gap: 60,
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {/* Left Column - Menu Sections */}
        <div style={{ flex: 2 }}>
          {menu.menuSections?.map((section, sectionIndex) => (
            <div
              key={section.id}
              style={{
                marginBottom: 48,
                opacity: showAnimations ? 0 : 1,
                transform: showAnimations
                  ? "translateY(20px)"
                  : "translateY(0)",
                animation: showAnimations
                  ? `slideInUp 0.6s ease-out ${sectionIndex * 0.2}s forwards`
                  : "none",
              }}
            >
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: "600",
                  marginBottom: 24,
                  borderBottom:
                    layoutType === "coffee-shop" ? "2px solid #34495e" : "none",
                  paddingBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {section.name}
              </h2>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {section.menuItems?.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom:
                        layoutType === "coffee-shop"
                          ? "1px solid rgba(52, 73, 94, 0.1)"
                          : "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    className={showAnimations ? "menu-item-hover" : ""}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: "500",
                          marginBottom: 4,
                          color: layoutStyles.color,
                        }}
                      >
                        {item.name}
                      </div>
                      {item.description && (
                        <div
                          style={{
                            fontSize: 16,
                            opacity: 0.7,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: "600",
                        marginLeft: 24,
                        minWidth: 80,
                        textAlign: "right",
                      }}
                    >
                      € {item.price?.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Visual Elements */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          {layoutType === "coffee-shop" && (
            <>
              {/* Coffee Cup Illustration */}
              <div
                style={{
                  width: 200,
                  height: 200,
                  background: "linear-gradient(145deg, #8B4513, #D2691E)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(139, 69, 19, 0.3)",
                  transform: showAnimations ? "rotate(0deg)" : "none",
                  animation: showAnimations
                    ? "float 3s ease-in-out infinite"
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    background: "#654321",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: "20%",
                      width: "60%",
                      height: "60%",
                      background:
                        "radial-gradient(circle at 30% 30%, #8B4513, #3E2723)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 3,
                    background: "linear-gradient(90deg, #34495e, #2c3e50)",
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    fontSize: 18,
                    fontStyle: "italic",
                    opacity: 0.8,
                    textAlign: "center",
                  }}
                >
                  Freshly brewed daily
                </div>
                <div
                  style={{
                    width: 150,
                    height: 3,
                    background: "linear-gradient(90deg, #2c3e50, #34495e)",
                    borderRadius: 2,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
