import React, { useEffect, useState } from "react";
import fr from "dayjs/locale/fr"
import { Legend, Tooltip, YAxis, XAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

function CovidHome() {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const request = await fetch("https://cascoronavirus.com/france-datas-national");
            const response = await request.json();

            var new_map = [];

            response.timeline.forEach((data) => {
                var result = (data.todayHospitalStart+data.todayReanimationStart)/data.todayCases;

                result = result === Infinity || isNaN(result) ? null : result;

                const json = {
                    cas: 100,
                    hospitalisation: result,
                    reanimation: (data.todayReanimationStart/data.todayCases)*100,
                    gueris: (data.todayRecovered/data.todayCases)*100,
                    mort: (data.todayDeathsHospital/data.todayCases) === Infinity || isNaN((data.todayDeathsHospital/data.todayCases)) ? null : (data.todayDeathsHospital/data.todayCases),
                    date: data.date
                }

                return json.hospitalisation && json.mort && new_map.push(json);
            })

            setData(new_map)
        }

        getData()
    }, [])

    return (
        <div className="globalsection">
            <div className="main">
                <div className="main-chart">
                    <h2>Pour 100 cas</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar stackId="a" dataKey="mort" fill="#C04725" />
                            <Bar stackId="a" dataKey="hospitalisation" fill="#4D4DD5" />
                            <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={str => {
                                const date = dayjs(str).get('month');
                                console.log(date);
                                if(date % 4 === 1){
                                    return dayjs(str).locale(fr).format("MMM, DD")
                                }
                                return ""
                            }} axisLine={false} tickLine={10} />
                            <YAxis interval="preserveStartEnd" />
                            <Tooltip />
                            <Legend verticalAlign="top" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CovidHome;