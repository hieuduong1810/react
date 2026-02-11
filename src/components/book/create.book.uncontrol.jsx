import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service"

const CreateUserModal = (props) => {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { isModalCreateOpen, setIsModalCreateOpen, loadBook } = props

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
        form.resetFields();
        setSelectedFile(null);
        setPreview(null)
    }

    const handleSubmitBtn = async (values) => {
        // step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            //success
            const newBook = resUpload.data.fileUploaded
            //step 2: update user
            const res = await createBookAPI(newBook, values.mainText, values.author, values.price, values.quantity, values.category)
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

    return (
        <Modal
            title="Create Book"
            open={isModalCreateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal(false)}
            maskClosable={false}
            okText={"CREATE"}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ margin: "10px" }}
                onFinish={handleSubmitBtn}
            // onFinishFailed={onFinishFailed}
            >
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
    );

}

export default CreateUserModal