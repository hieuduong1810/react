import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { updateBookAPI, handleUploadFile } from "../../services/api.service"

const UpdateBookModal = (props) => {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { isModalUpdateOpen, setIsModalUpdateOpen, loadBook, dataUpdate, setDataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({ _id: dataUpdate._id });
            form.setFieldsValue({ mainText: dataUpdate.mainText });
            form.setFieldsValue({ author: dataUpdate.author });
            form.setFieldsValue({ price: dataUpdate.price });
            form.setFieldsValue({ quantity: dataUpdate.quantity });
            form.setFieldsValue({ category: dataUpdate.category });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const handleSubmitBtn = async (values) => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }
        let newThumbnail = "";
        //có ảnh preview và không có file => không upload file
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail

            alert("me")
        }
        else {

            // step 1: upload file
            const resUpload = await handleUploadFile(selectedFile, "book")
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded

            }
            else {
                //failed
                notification.error({
                    message: "Error upload file book",
                    description: JSON.stringify(resUpload.message)
                })
            }

        }
        //step 2: update user
        const res = await updateBookAPI(values.id, newThumbnail, values.mainText, values.author, values.price, values.quantity, values.category)

        if (res.data) {
            notification.success({
                message: "update book",
                description: "Cập nhật book thành công"
            })
            resetAndCloseModal()
            await loadBook()
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
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
        setIsModalUpdateOpen(false)
        form.resetFields();
        setSelectedFile(null);
        setPreview(null)
        setDataUpdate(null)

    }
    return (
        <Modal
            title="Create Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal(false)}
            maskClosable={false}
            okText={"Save"}
        >

            <Form
                form={form}
                layout="vertical"
                style={{ margin: "10px" }}
                onFinish={handleSubmitBtn}
            // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Id"
                    name="_id"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[{ required: true, message: 'Please input your mainText!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[{ required: true, message: 'Please input your author!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        addonAfter={' đ'}
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input your quantity!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[{ required: true, message: 'Please input your category!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
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
                </Form.Item>
            </Form>

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
        </Modal>
    )
}

export default UpdateBookModal