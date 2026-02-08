import { Drawer } from "antd";

const ViewUserDetail = (props) => {

    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props
    return (
        <Drawer
            title="Chi tiết User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setIsDetailOpen(false)
                setDataDetail(null)
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name:: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>}
        </Drawer>
    )
}

export default ViewUserDetail