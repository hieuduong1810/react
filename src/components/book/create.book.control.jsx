import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service"

const CreateUserModal = (props) => {
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [category, setCategory] = useState("Arts")
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { isModalCreateOpen, setIsModalCreateOpen, loadBook } = props

    const handleSubmitBtn = async () => {
        // step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            //success
            const newBook = resUpload.data.fileUploaded
            console.log(">>>category: ", category)
            //step 2: update user
            const res = await createBookAPI(newBook, mainText, author, price, quantity, category)
            if (res.data) {
                notification.success({
                    message: "create book",
                    description: "Tạo book thành công"
                })
                resetAndCloseModal()
                await loadBook()
            } else {
                notification.error({
                    message: "Error create user",
                    description: JSON.stringify(res.message)
                })
            }
        }
        else {
            //failed
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
        }

    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("Arts")
        setSelectedFile(null);
        setPreview(null)
    }
    return (
        <Modal
            title="Create Book"
            open={isModalCreateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal(false)}
            maskClosable={false}
            okText={"CREATE"}
        >
            <div style={{ display: "flex", gap: " 15px", flexDirection: "column" }}>
                <div>
                    <span>Tiêu đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => { setMainText(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Tác giả</span>
                    <Input
                        value={author}
                        onChange={(event) => { setAuthor(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Giá tiền</span>
                    <InputNumber
                        style={{ width: '100%' }}
                        addonAfter={' đ'}
                        value={price}
                        onChange={(value) => { setPrice(value) }}
                    />
                </div>
                <div>
                    <span>Số lượng</span>
                    <InputNumber
                        style={{ width: '100%' }}
                        value={quantity}
                        onChange={(value) => { setQuantity(value) }}
                    />
                </div>
                <div>
                    <span>Thể loại</span>
                    <Select
                        defaultValue="Arts"
                        style={{ width: '100%' }}
                        onChange={(value) => { setCategory(value) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </div>

                <span>Ảnh thumbnail</span>
                <div>
                    <label htmlFor="btnUpload" style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        padding: "5px 10px",
                        background: " orange",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Upload</label>
                    <input type="file" hidden id='btnUpload'
                        // onChange={handleOnChangeFile}
                        onChange={(event) => handleOnChangeFile(event)}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                </div>
                {preview &&
                    <>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px", width: "150px",
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
}

export default CreateUserModal