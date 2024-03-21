import * as echarts from "echarts";
import { partyColorFromSlug, shortPartyNameFromSlug } from "./Party";

const getChartData = (
  partyData: PartyVoteResult[],
  rawVote: boolean = false,
) => {
  const axisArray: string[] = [];
  const seriesArray: {
    value: number;
    itemStyle: {
      color: string;
    };
  }[] = [];

  partyData.forEach((resultData: PartyVoteResult) => {
    let voteValue = rawVote ? resultData.rawVote : resultData.votePercent;
    if (voteValue && voteValue > 0) {
      axisArray.push(shortPartyNameFromSlug(resultData.partySlug));

      seriesArray.push({
        value: voteValue,
        itemStyle: { color: partyColorFromSlug(resultData.partySlug) },
      });
    }
  });

  return { axisArray: axisArray, seriesArray: seriesArray };
};

const svgChart = (partyData: PartyVoteResult[], rawVote: boolean = false) => {
  const { axisArray, seriesArray } = getChartData(partyData, rawVote);

  const chart = echarts.init(null, null, {
    renderer: "svg", // must use SVG rendering mode
    ssr: true, // enable SSR
    width: 416, // need to specify height and width
    height: 250,
  });

  chart.setOption({
    grid: {
      left: 35,
      right: 2,
      top: 5,
      bottom: 57,
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

  if (rawVote) {
    chart.setOption({
      grid: { left: 50 },
      yAxis: { axisLabel: { formatter: "{value}" } },
    });
  }

  return chart.renderToSVGString().replace('width="416" height="250" ', "");
};

export { svgChart };
