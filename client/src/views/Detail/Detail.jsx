import DetailCardContainer from "../../components/DetailCardContainer/DetailCardContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideoGameDetail, clearVideoGameDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(()=>{
        dispatch(getVideoGameDetail(id));

        return () => {
            dispatch(clearVideoGameDetail());
        }
    }, [dispatch])

    return (
        <section>
            <DetailCardContainer />
        </section>
    )
}

export default Detail;