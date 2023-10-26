import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import "./General.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


function General(){

    const price = 50000;
    var today = new Date()
    const account = useSelector(state => state.account)

    const [chartPerDay, setChartPerDay] = useState()
    const [chartPerMonth, setChartPerMonth] = useState()
    const [chartPerYear, setChartPerYear] = useState()
    const [chartOrders, setChartOrders] = useState()
    const [chartIncome, setChartIncome] = useState()
    const [chartDays, setChartDays] = useState()
    const [chartPerWeek, charPerWeek] = useState()
    const [chartMonths, setChartMonths] = useState()



    useEffect(() => {
        axios
        .get(`/api/admin/manager/order?time=day&&number=${today.getDate()}`,{
            headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            setChartPerDay(res.data)
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/admin/manager/order?time=month&&number=${today.getMonth()+1}`,{
            headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            setChartPerMonth(res.data)
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/admin/manager/order?time=year&&number=${today.getFullYear()}`,{
            headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            setChartPerYear(res.data)
        })
        .catch(err => console.log(err))


        axios
        .get(`/api/admin/manager/chart`,{
            headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            const data = res.data
            setChartDays(data.days)
            setChartIncome(data.incomes)
            setChartOrders(data.orders)
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/admin/manager/chartMonth`,{
            headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            setChartMonths(res.data.incomes)
        })
        .catch(err => console.log(err))

       
       
    },[])

    const chartMonth = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'HOLA FOOD IN ' + today.getFullYear(),
            align: 'center'
        },
        subtitle: {
            text: 'Source: HOLA FOOD',
            align: 'left'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 120,
            y: 70,
            floating: true,
            borderWidth: 1,
            backgroundColor: "#FFFFFF"
        },
        xAxis: {
            plotBands: [{ // Highlight the two last years
                from: today.getMonth(),
                to: today.getMonth()+1,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'INCOME OF HOLA FOOD IN ' + today.getFullYear() + " (VNĐ)"
            }
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>Income of HOLA FOOD in month {point.x}</b><br>'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointStart: 1
            },
            areaspline: {
                fillOpacity: 0.5
            }
        },series: [{
            name: 'Incomes',
            data: chartMonths
        }]
    }

    
    const chartYear = {
        chart:{
            zoomType: 'xy'
        },
        title:{
            text: "ORDER IN THE MONTH " + (today.getMonth()+1),
            align: 'center'
        },
        subtitle: {
            text: 'Source: ' +
                'HOLA FOOD',
            align: 'left'
        },
         xAxis: [{
            categories: chartDays,
            crosshair: true
        }],
        yAxis: [{
            
            title: {
             text: 'Income (VNĐ)'
            }
        }, {
            title: {
                text: 'Order'
            },
            opposite: true
        }],
        legend: {
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 60,
            floating: true,
            backgroundColor:'rgba(255,255,255,0.25)'
        },
        tooltip: {
            shared: true
        },
       
        series: [{
            name: 'Orders',
            type: 'column',
            yAxis: 1,
            data: chartOrders,
            tooltip: {
                valueSuffix: ' orders'
            }

        }, {
            name: 'Income',
            type: 'spline',
            data: chartIncome,
            tooltip: {
                valueSuffix: 'VNĐ'
            }
        }]
    }

    return(
        <div className="generalPage">
            <div className="listBoxInfor">
                <div className="boxInfor1">
                   <div className="boxTitle">
                        <h4>Today</h4>
                   </div>                   
                    <hr />
                   <div className="boxContent">
                        <div className="leftBoxContent">
                            <h5>Total Order</h5>
                            <p>{chartPerDay?.totalOrder}</p>
                        </div>
                        <div className="rightBoxContent">
                            <h5>Income</h5>
                            <p>{chartPerDay?.totalMoney?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                   </div>
                </div>
                <div className="boxInfor2">
                    <div className="boxTitle">
                        <h4>This Month</h4>
                   </div>
                    <hr />
                   <div className="boxContent">
                        <div className="leftBoxContent">
                            <h5>Total Order</h5>
                            <p>{chartPerMonth?.totalOrder}</p>
                        </div>
                        <div className="rightBoxContent">
                            <h5>Income</h5>
                            <p>{chartPerMonth?.totalMoney?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                   </div>
                </div>
                <div className="boxInfor3">
                    <div className="boxTitle">
                        <h4>This Year</h4>
                   </div>
                    <hr />
                   <div className="boxContent">
                        <div className="leftBoxContent">
                            <h5>Total Order</h5>
                            <p>{chartPerYear?.totalOrder}</p>
                        </div>
                        <div className="rightBoxContent">
                            <h5>Income</h5>
                            <p>{chartPerYear?.totalMoney?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                   </div>
                </div>
                
            </div>

            <div className="detailInfor" style={{display: "none"}}>
                <div className="activity" >
                    <div className="activityHeader">
                        <i>logo</i>
                        <span className="activityTitle">
                            Activity
                        </span>
                    </div>
                    <div className="activityDetail">
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
                <div className="activity">
                    <div className="activityHeader">
                        <i>logo</i>
                        <span className="activityTitle">
                            Activity
                        </span>
                    </div>
                    <div className="activityDetail">
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
                <div className="activity">
                    <div className="activityHeader">
                        <i>logo</i>
                        <span className="activityTitle">
                            Activity
                        </span>
                    </div>
                    <div className="activityDetail">
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                        <div className="incomeActivity">
                            <span>Name Activity</span>
                            <p>{price}</p>
                        </div>
                    </div>
                </div> 

                <div className="orderDetail">

                </div>

                <div className="detailProduct">

                </div>
            </div>

             <div className="chartDiv">
                 <div className="chartYear">
                     <HighchartsReact
                        highcharts={Highcharts}
                        options={chartYear}
                    />
                 </div>
                 <div className="chartMonth">
                     <HighchartsReact
                        highcharts={Highcharts}
                        options={chartMonth}
                    />
                 </div>
             </div>
        </div>
    )
}

export default General