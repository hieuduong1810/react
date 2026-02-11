import { Drawer } from "antd"

const ViewBookDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props
    return (
        <Drawer
            width={"40vw"}
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
                    <p>Tiêu đề: {dataDetail.mainText}</p>
                    <br />
                    <p>Tác gia: {dataDetail.author}</p>
                    <br />
                    <p>Thể loại: {dataDetail.category}</p>
                    <br />
                    <p>Giá tiền: {new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
                    <br />
                    <p>Số lượng: {dataDetail.quantity}</p>
                    <br />
                    <p>Đã bán: {dataDetail.sold}</p>
                    <br />
                    <p>Thumbnail: </p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
                    </div>
                    {/* <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: " orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload Avatar</label>
                        <input type="file" hidden id='btnUpload'
                        // onChange={handleOnChangeFile}
                        onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div> */}
                    {/* {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                            <Button type="primary"
                                onClick={handleUpdateUserAvatar}
                            >Save</Button>
                        </>
                    } */}
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>}
        </Drawer>
    )
}

export default ViewBookDetail