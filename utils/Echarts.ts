import * as echarts from "echarts";
import { partyColorFromSlug, partyNameFromSlug } from "./Party";

const getChartData = (partyData: PartyVoteResult[]) => {
  const axisArray: string[] = [];
  const seriesArray: {
    value: number;
    itemStyle: {
      color: string;
    };
  }[] = [];

  for (let i = 0; i < partyData.length; i++) {}
  partyData.forEach((resultData: PartyVoteResult) => {
    if (resultData.votePercent > 0) {
      axisArray.push(partyNameFromSlug(resultData.partySlug));

      if (resultData.votePercent < 15) {
        seriesArray.push({
          value: resultData.votePercent,
          itemStyle: { color: partyColorFromSlug(resultData.partySlug) },
        });
      } else {
        seriesArray.push({
          value: resultData.votePercent,
          itemStyle: { color: partyColorFromSlug(resultData.partySlug) },
        });
      }
    }
  });

  return { axisArray: axisArray, seriesArray: seriesArray };
};

const svgChart = (partyData: PartyVoteResult[]) => {
  const { axisArray, seriesArray } = getChartData(partyData);

  const chart = echarts.init(null, null, {
    renderer: "svg", // must use SVG rendering mode
    ssr: true, // enable SSR
    width: 350, // need to specify height and width
    height: 250,
  });

  chart.setOption({
    grid: {
      left: 40,
      right: 10,
      top: 10,
      bottom: 100,
    },
    xAxis: {
      data: axisArray,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],

    series: [
      {
        type: "bar",
        data: seriesArray,
        showBackground: true,
      },
    ],
  });

  return chart.renderToSVGString();
};

export { svgChart };
