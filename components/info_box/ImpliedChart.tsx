import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaUsers } from "react-icons/fa6";
import { partyColorFromSlug, partyNameFromSlug } from "@/utils/Party";
import * as echarts from 'echarts';

const getChartData = (partyData: PartyVoteResult[]) => { 
  const axisArray: string[] = []; 
  const seriesArray: {value:number, itemStyle: {color: string}}[] = [];

  for(let i = 0; i < partyData.length; i++) { 
  }
  partyData.forEach((resultData: PartyVoteResult) => { 
    if(resultData.votePercent > 0){ 
      axisArray.push(partyNameFromSlug(resultData.partySlug));
      seriesArray.push({value: resultData.votePercent, itemStyle: {color: partyColorFromSlug(resultData.partySlug)}});
    }
  });


  return { axisArray: axisArray, seriesArray: seriesArray};
};

const ImpliedChart = ({
   constituencyData,
    }: {
    constituencyData: ConstituencyData;
    }) => {


  const { axisArray, seriesArray} = getChartData(constituencyData.impliedPreviousResult.partyVoteResults);
  const chart = echarts.init(null, null, {
    renderer: "svg", // must use SVG rendering mode
    ssr: true, // enable SSR
    width: 350, // need to specify height and width
    height: 250,
  });

  chart.setOption({
    xAxis: {
      data:  axisArray,
      axisLabel: { 
        rotate: 45
      }
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: seriesArray,
        showBackground: true,
      },
    ],
  });

  const svgStr = chart.renderToSVGString();

  return (
    <InfoBox>
      <>
        <h3 className={`${rubik.className} fs-5`}>2019 Election Results (Implied)</h3>
        <p>
          The 2019 implied results from your constituency:
        </p>
        <div className="d-flex justify-content-center"
        dangerouslySetInnerHTML={{__html:svgStr}} />
      </>
    </InfoBox>
  );
};

export default ImpliedChart;
