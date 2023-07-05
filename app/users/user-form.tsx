import { UserRoleArray } from '../../types/array.types'
import { UserType } from '../../types/user.type'
import EmailList from './email-list'
import PhoneList from './phone-list'

export default function UserForm({
	user,
	showPass,
	createPhone,
	updatePhone,
	deletePhone,
	createEmail,
	updateEmail,
	deleteEmail,
	updateUserAttr,
}: {
	user: UserType
	showPass: boolean
	createPhone: Function
	updatePhone: Function
	deletePhone: Function
	createEmail: Function
	updateEmail: Function
	deleteEmail: Function
	updateUserAttr: Function
}) {
	const credentialsChanged = (ev: any) => {
		const { Credentials } = user
		const { name, value } = ev.target
		const newCreds = {
			...Credentials,
			[name]: value,
		}
		updateUserAttr({
			...user,
			Credentials: newCreds,
		})
	}

	const nameChanged = (ev: any) => {
		const { Name } = user
		const { name, value } = ev.target
		const newName = {
			...Name,
			[name]: value,
		}
		updateUserAttr({
			...user,
			Name: newName,
		})
	}

	const rolesChanged = (ev: any) => {
		const { Roles } = user
		if (!Roles) return
		const { value, checked } = ev.target
		if (checked) {
			Roles.push(value)
		} else {
			const idx = Roles.indexOf(value)
			if (idx != -1) Roles.splice(idx, 1)
		}
		updateUserAttr({
			...user,
			Roles,
		})
	}
	return (
		<div id="user-form">
			<div className="flex flex-wrap justify-between">
				<div>
					<label htmlFor="Username" className="block">
						Username
					</label>
					{user.Credentials && (
						<input
							type="text"
							name="Username"
							id="Username"
							defaultValue={user.Credentials.Username}
							onChange={credentialsChanged}
						/>
					)}
				</div>
				{showPass && (
					<div>
						<label htmlFor="Password" className="block">
							Password
						</label>
						{user.Credentials && (
							<input
								type="password"
								name="Password"
								id="Password"
								defaultValue={user.Credentials.Password}
								onChange={credentialsChanged}
							/>
						)}
					</div>
				)}
			</div>
			<div className="flex flex-wrap justify-between">
				<div>
					<label htmlFor="First" className="block">
						First
					</label>
					{user.Name && (
						<input
							type="text"
							name="First"
							id="First"
							defaultValue={user.Name.First}
							onChange={nameChanged}
						/>
					)}
				</div>
				<div>
					<label htmlFor="Middle" className="block">
						Middle
					</label>
					{user.Name && (
						<input
							type="text"
							name="Middle"
							id="Middle"
							defaultValue={user.Name.Middle}
							onChange={nameChanged}
						/>
					)}
				</div>
				<div>
					<label htmlFor="Last" className="block">
						Last
					</label>
					{user.Name && (
						<input
							type="text"
							name="Last"
							id="Last"
							defaultValue={user.Name.Last}
							onChange={nameChanged}
						/>
					)}
				</div>
			</div>
			<div className="flex flex-wrap justify-between">
				{UserRoleArray.map((role, idx) => (
					<div key={idx}>
						<input
							type="checkbox"
							name="role"
							id={'role-' + role}
							value={role}
							defaultChecked={user.Roles && user.Roles.indexOf(role) > -1}
							onChange={rolesChanged}
						/>
						<label htmlFor={'role-' + role} className="ml-2">
							{role}
						</label>
					</div>
				))}
			</div>
			<PhoneList
				phones={user.Phones || []}
				createPhone={createPhone}
				updatePhone={updatePhone}
				deletePhone={deletePhone}
			/>
			<EmailList
				emails={user.Emails || []}
				createEmail={createEmail}
				updateEmail={updateEmail}
				deleteEmail={deleteEmail}
			/>
		</div>
	)
}
