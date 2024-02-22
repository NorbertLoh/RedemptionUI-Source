import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
	Space,
	Table,
	Col,
	Row,
	Typography,
	Button,
	Form,
	message,
	Input,
} from 'antd';
import type { TableProps } from 'antd';
import config from '../config'

const { Title } = Typography;

const RedemptionPage: React.FC<{}> = (props) => {
	// Datatype expected from url params.
	interface RouteParams {
		[key: string]: string | undefined;
		id: string;
	}

	// Created expected datatype to store redemption data.
	interface DataType {
		redemption_id: number;
		event_id: number;
		redeemed_at: Date;
		team_name: string;
	}

	// Form item field type for validation.
	type FieldType = {
		staff_pass_id: string;
	};

	// Table design specifications
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Team Name',
			dataIndex: 'team_name',
			key: 'team_name',
			width: "65%",
			ellipsis: true
		},
		{
			title: 'Redeemed At',
			dataIndex: 'redeemed_at',
			key: 'redeemed_at',
			width: "35%",
			ellipsis: true
		},
	];

	const [data, setData] = useState<DataType[] | undefined>(undefined);
	const [messageApi, contextHolder] = message.useMessage();
	const { id } = useParams<RouteParams>();
	const [form] = Form.useForm();

	// get events
	useEffect(() => {
		getRedemption()
	}, []);

	// Get redemptions from web service.
	const getRedemption = () => {
		fetch(config.API_BASE_URL + "/redemption/" + id)
			.then(response => response.json())
			.then(data => setData(data.response))
			.catch(error => console.error('Error:', error));
	}

	// POST form data to webservice after user submits.
	const onFinish = async (values: FieldType) => {
		const staff_pass_id = values.staff_pass_id;
		if (id !== undefined) {
			// Build payload.
			const data = {
				staff_pass_id: staff_pass_id,
				event_id: parseInt(id)
			}

			// POST to webservice
			const response = await fetch(config.API_BASE_URL + "/redemption", {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			// Displays response on popup.
			const json = await response.json();
			if (json.status === 201) {
				messageApi.open({
					type: 'success',
					content: json.response,
				});

				// Reset form and update redemption table.
				form.resetFields();
				getRedemption();
			} else if (json.status === 200) {
				messageApi.open({
					type: 'error',
					content: json.response,
				});
			} else {
				messageApi.open({
					type: 'error',
					content: json.message,
				});
			}
		}
	};

	return (
		<Row className="center-row" gutter={[16, 16]} justify="center">
			{/* Element for message popup box. */}
			{contextHolder}
			<Col span={24}>
				<Row justify="center">
					<Col md={24} xs={24} sm={24} lg={12}>
						<Row>
							<Col span={24}>
								<Space direction="vertical" size="small" style={{ width: "100%" }}>
									<Form
										form={form}
										name="Add New Event"
										labelCol={{ span: 8 }}
										wrapperCol={{ span: 16 }}
										onFinish={onFinish}
										autoComplete="off"
									>
										<Row align={"top"} justify={"center"} gutter={[8, 0]}>
											<Col md={24} xs={24} sm={24} lg={12}>
												<Form.Item<FieldType>
													label="Staff Pass ID"
													name="staff_pass_id"
													rules={[{ required: true, message: 'Please input Staff Pass ID!' }, { max: 100, message: 'Staff pass ID cannot be more than 100 characters!' }]}
												>
													<Input />
												</Form.Item>
											</Col>
											<Col md={6} xs={6} sm={6} lg={4}>
												<Form.Item>
													<Button type="primary" htmlType="submit">
														Submit
													</Button>
												</Form.Item>
											</Col>
										</Row>
									</Form>
								</Space>
							</Col>
						</Row>
						<Col md={24} xs={24} sm={24} lg={24}>
							<Row>
								<Col>
									<Title>Redemption History</Title>
								</Col>
							</Row>
							<Row>
								<Col md={24} xs={24} sm={24} lg={24}>
									<Table pagination={{ pageSize: 5, defaultPageSize: 5 }} columns={columns} dataSource={data} />
								</Col>
							</Row>
						</Col>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default RedemptionPage;