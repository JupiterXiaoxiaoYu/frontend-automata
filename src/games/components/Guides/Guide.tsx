import GuideMission from "./GuideMission";
import GuideResource from "./GuideResource";
import GuideProgram from "./GuideProgram";
import GuideCircle from "./GuideCircle";
import GuideFinal from "./GuideFinal";
import { GuideType } from "../../../data/automata/models";

const guideMission = "guideMission";
const guideResource = "guideResource";
const guideProgram = "guideProgram";
const guideCircle = "guideCircle";
const guideFinal = "guideFinal";
export const guidePageMap: {
  [key: string]: JSX.Element;
} = {
  guideMission: <GuideMission />,
  guideResource: <GuideResource />,
  guideProgram: <GuideProgram />,
  guideCircle: <GuideCircle />,
  guideFinal: <GuideFinal />,
};

export function getGuidePages(type: GuideType) {
  switch (type) {
    case GuideType.First:
      return [
        guideMission,
        guideResource,
        guideProgram,
        guideCircle,
        guideFinal,
      ];
    default:
      return [];
  }
}
