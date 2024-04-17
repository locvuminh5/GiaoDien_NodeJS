import { Avatar, List, Rate, Space, Table, Typography, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';


function Coupon() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    // let index = 0;

    useEffect(() => {
        console.log("list call");
        setLoading(true);
        getCoupons();
        // index = 0;
    }, []);

    const getCoupons = async () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/coupon/',
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setDataSource(response.data);
                setLoading(false)
                console.log(JSON.stringify(response.data))

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const columns = [
        // {
        //   title: 'Id',
        //   // dataIndex: '_id',
        //   key: '_id',
        //   render: (index) => {
        //     return <>{index++}</>
        //   }
        // },
        {
            title: 'Mã Giảm Giá',
            dataIndex: 'code',
            render: (code) => {
                return <>{code}</>
            }
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            // sorter: (a, b) => a.name.length - b.name.length,
            // defaultSortOrder: 'ascend',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            render: (code) => {
                return code ? <>Hoạt Động</> : <>Không Hoạt Động</>
            }
        },
        {
            title: 'Giá Trị',
            dataIndex: 'value',
            render: (value) => {
                return <>{value}</>
            }
        },
        // {
        //     title: 'Category',
        //     dataIndex: ['category', 'name'],
        //     key: 'category',
        //     // render: item => console.log(Object.keys(item)),
        // },
        {
            title: 'Hành Động',
            render: (record) => {
                return <>
                    <Button style={{
                        width: 70,
                        height: 40,
                        color: "green",
                        fontSize: 20,
                        marginRight: 10,
                        borderColor: "green"
                    }}
                        onClick={() => {
                            navigate('/coupon-edit',
                                {
                                    state: { record: record }
                                });
                        }}
                    >
                        <EditOutlined />
                    </Button>
                    {/* <Button danger
                        style={{
                            width: 70,
                            height: 40,
                            fontSize: 20,
                        }}
                    >
                        <DeleteOutlined onClick={() => {
                            deleteHandle(record);
                        }} />
                    </Button> */}
                </>
            }
        },

    ];

    function handleClick(event) {

        navigate('/coupon-create');
    }

    const deleteHandle = async (record) => {
        await Modal.confirm({
            title: "Có chắc sẽ xóa phim này không?",
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: async () => {
                let config = {
                    method: 'delete',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8000/movie/' + record._id,
                    headers: {}
                };

                await axios.request(config)
                    .then((response) => {
                        console.log("deleted");
                        getCoupons();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
    }

    return (
        <>
            <Typography.Title level={4}>Danh Sách Mã Giảm Giá</Typography.Title>
            <List size={20} direction="vertical">
                <Button type="primary"
                    style={{
                        position: "absolute",
                        top: -50,
                        right: 50,
                        width: 230,
                        height: 40,
                        fontSize: 18,
                        fontWeight: "bold",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={() => { handleClick() }}>Thêm Mã Giảm Giá <PlusOutlined /></Button>

                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 3,
                    }}
                    rowKey={(record) => record._id}
                ></Table>
            </List>
        </>
    );
}
export default Coupon;
