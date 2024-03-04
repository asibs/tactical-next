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
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.18",
        },
      },
    ],
  });

  if (rawVote) {
    chart.setOption({
      grid: { left: 50 },
      yAxis: { axisLabel: { formatter: "{value}" } },
    });
  }

  return chart.renderToSVGString();
};

const getStackData = (
  partyData: PartyVoteResult[],
  rawVote: boolean = false,
) => {
  const seriesArray: {
    type: "bar";
    name: string;
    data: [null | number, null | number, null | number];
    barGap: string;
    showBackground: boolean;
    backgroundStyle: {
      color: string;
    };
    stack: string;
    itemStyle: {
      color: string;
    };
  }[] = [];

  const nonConSlug = ["Lab", "LD", "Green", "PC", "SNP", "NonVoter"];
  const conSlugs = ["Con"];
  partyData.forEach((resultData: PartyVoteResult) => {
    let voteValue = rawVote ? resultData.rawVote : resultData.votePercent;
    if (voteValue && voteValue > 0) {
      let data: [number | null, number | null, number | null] = [
        null,
        null,
        null,
      ];
      let stack = "";
      if (nonConSlug.includes(resultData.partySlug)) {
        stack = "NotTory";
        data = [null, voteValue, null];
      } else if (conSlugs.includes(resultData.partySlug)) {
        stack = "Tory";
        data = [voteValue, null, null];
      } else {
        data = [null, null, voteValue];
      }

      seriesArray.push({
        type: "bar",
        name: "Lab",
        barGap: "-100%",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.04)",
        },
        stack: stack,
        data: data,
        itemStyle: {
          color: partyColorFromSlug(resultData.partySlug),
        },
      });
    }
  });

  return { seriesArray: seriesArray };
};

const svgStack = (partyData: PartyVoteResult[], rawVote: boolean = false) => {
  const { seriesArray } = getStackData(partyData, rawVote);

  const chart = echarts.init(null, null, {
    renderer: "svg", // must use SVG rendering mode
    ssr: true, // enable SSR
    width: 200, // need to specify height and width
    height: 250,
  });

  chart.setOption({
    grid: {
      left: 40,
      right: 10,
      top: 10,
      bottom: 100,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        axisLabel: {
          rotate: 45,
        },
        data: ["Tories", "Not Tories", "Others"],
      },
    ],

    yAxis: [
      {
        type: "value",
      },
    ],

    series: seriesArray,
  });

  if (rawVote) {
    chart.setOption({
      grid: { left: 50 },
      yAxis: { axisLabel: { formatter: "{value}" } },
    });
  }

  return chart.renderToSVGString();
};

export { svgChart, svgStack };
