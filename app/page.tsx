import { FiHome } from 'react-icons/fi'

export default function Home() {
	return (
		<div>
			<div className="flex">
				<span className="mr-2 mt-1">
					<FiHome size="1.5em" />
				</span>
				<h1>Welcome to Issue Tracker</h1>
			</div>

			<div className="mb-4">
				This site is a functional example of an issue tracking application. All
				of the existing data has been generated randomly. It is not intended to
				be used as a replacement for current leaders in the field such as Jira.
				The goal of the site is simply a proof of concept for an issue tracking
				application.
			</div>

			<div className="mb-4">
				In order to perform actions to edit data on the site you will need to
				sign in as one of the random users. To do this select the username for
				the user you choose and the password noted on the dialog.
			</div>

			<div className="mb-4">
				Construction of this site used the component based framework{' '}
				<a href="https://nextjs.org/" target="_blank">
					Next
				</a>{' '}
				and the CSS framework
				<a href="https://tailwindcss.com/" target="_blank">
					Tailwind CSS.
				</a>{' '}
				The benefit of using a component based framework is that it becomes
				easier to follow the DRY ( don&apos;t repeat yourself ) principle. In
				addition, effort was made not to reinvent the wheel.
			</div>

			<div className="mb-4">
				This site is one of four front end sites that share a common back end
				api. The front end sites are composed using the frameworks:
				<ul>
					<li>
						<a href="https://react.dev/" target="_blank">
							React
						</a>
					</li>
					<li>
						<a href="https://vuejs.org/" target="_blank">
							Vue
						</a>
					</li>
					<li>
						<a href="https://angular.io/" target="_blank">
							Angular
						</a>
					</li>
					<li>
						<a href="https://svelte.dev/" target="_blank">
							Svelte
						</a>
					</li>
				</ul>
				The back end api was composed using{' '}
				<a href="https://nestjs.com/" target="_blank">
					Nestjs
				</a>
				.
			</div>

			<div className="mb-4">
				The source code for all sites is available upon request.
			</div>
		</div>
	)
}
