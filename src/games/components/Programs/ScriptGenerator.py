import os

base_path = "/Users/charlie/Documents/GitHub/frontend-automata/src/games/images/Animations/Programs/"
programs = [dir_name for dir_name in os.listdir(base_path)]

template = """import React, {{ useEffect }} from "react";
import "../MainMenuProgram.css";
{imports}

interface Props {{
  showAnimation: boolean;
}}

const {component_name} = ({{ showAnimation }}: Props) => {{
  const animationName = "{component_name}Frames";
  const images = [
{images_array}
  ];

  const generateAnimation = () => {{
    if (document.getElementById(animationName)) {{
      return;
    }}

    const keyframes = [...images, images[0]]
      .map((img, index) => {{
        const percentage = (index / images.length) * 100;
        return `${{percentage}}% {{ background-image: url(${{img}}); }}`;
      }})
      .join(" ");

    const style = document.createElement("style");
    style.id = animationName;
    style.innerHTML = `
    @keyframes ${{animationName}} {{
        ${{keyframes}}
    }}`;
    document.head.appendChild(style);
  }};

  useEffect(() => {{
    generateAnimation();
  }}, []);

  return (
    <>
      {{images.map((image, index) => (
        <link key={{index}} rel="preload" href={{image}} as="image" />
      ))}}
      {{
        <div
          className="main-bot-program-image"
          style={{
            showAnimation
              ? {{ animation: `${{animationName}} 2s steps(24) infinite` }}
              : {{ backgroundImage: `url('${{images[0]}}')` }}
          }}
        />
      }}
    </>
  );
}};

export default {component_name};
"""

output_dir = "/Users/charlie/Documents/GitHub/frontend-automata/src/games/components/Programs/"  # Update this with your output directory

for program in programs:
    # imports = "\n".join(
    #     [f'import image_{i:02} from "../../images/Animations/Programs/{program}/{program}_{i:02}.png";' for i in range(24)]
    # )
    
    # images_array = ",\n".join([f"    image_{i:02}" for i in range(24)])
    
    # content = template.format(
    #     imports=imports,
    #     component_name=program,
    #     images_array=images_array
    # )
    
    # file_name = os.path.join(output_dir, f"{program}.tsx")
    # with open(file_name, "w") as file:
    #     file.write(content)

    # print(f'import {program} from "../../games/components/Programs/{program}";')
    
    # print(f"""case ProgramType.{program}:
    #   return <{program} showAnimation={{showAnimation}} />;""")
    
    
    # print(f'import {program}Icon from "../../games/images/Animations/Programs/{program}/{program}_00.png";')
    
    
    # print(f"""case ProgramType.{program}:
    #   return {program}Icon;""")
    
    
    print(f"""case ProgramType.{program}:
      return "{program}";""")
