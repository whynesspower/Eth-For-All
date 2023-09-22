import { Tab } from '@headlessui/react'
import PublishedStream from './PublishedStream'
import Assets from './Assets'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserDashboard() {

    const tabs = [
        'Published Streams',
        'Uploaded Videos',
    ]

    return (
        <div className="h-screen z-0 p-10">
            <h1 className="text-3xl font-bold pb-2 mb-4 ">Dashboard</h1>
            <Tab.Group>
                <Tab.List className="flex select-none  text-gray-400 p-1 gap-1 items-center bg-gray-900  rounded-lg  my-4 overflow-hidden ">
                    {tabs.map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 font-medium leading-5 text-white text-lg',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-gradient-to-r from-emerald-500 to-sky-600 shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="flex w-full flex-wrap gap-4">
                            <PublishedStream />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="flex w-full flex-wrap gap-4">
                            <Assets />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div >
    )
}
