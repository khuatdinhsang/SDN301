import "./General.scss"


function General(){

    const price = 50000;

    return(
        <div className="generalPage">
            <div className="listBoxInfor">
                <div className="boxInfor1">
                    <div className="leftBoxInfor">
                        left
                    </div>
                    <div className="rightBoxInfor">
                        <span>Income</span>
                        <p>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>
                <div className="boxInfor2">
                    <div className="leftBoxInfor">
                        left
                    </div>
                    <div className="rightBoxInfor">
                        <span>Income</span>
                        <p>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>
                <div className="boxInfor3">
                    <div className="leftBoxInfor">
                        left
                    </div>
                    <div className="rightBoxInfor">
                        <span>Income</span>
                        <p>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>
                <div className="boxInfor4">
                    <div className="leftBoxInfor">
                        left
                    </div>
                    <div className="rightBoxInfor">
                        <span>Income</span>
                        <p>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>
            </div>

            <div className="detailInfor">
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

                {/* <div className="orderDetail">

                </div>

                <div className="detailProduct">

                </div> */}
            </div>
        </div>
    )
}

export default General