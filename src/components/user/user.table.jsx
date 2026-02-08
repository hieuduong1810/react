import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id)
        if (res.data) {
            notification.success({
                message: "delete user",
                description: "xóa user thành công"
            })
            await loadUser()
        } else {
            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message)
            })
        }
    }


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setIsDetailOpen(true)
                            setDataDetail(record)
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined

                        onClick={() => {
                            setIsModalUpdateOpen(true)
                            setDataUpdate(record)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa user này không ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >

                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    )
}

export default UserTable