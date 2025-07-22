"use client"

import { mockProjects } from "@/lib/mock-projects-data"
import { mockGroups } from "@/lib/mock-data"

export default function TestProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Projects Data</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Groups:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(mockGroups.map(g => ({ id: g.id, name: g.name })), null, 2)}
        </pre>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Projects:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(mockProjects, null, 2)}
        </pre>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Projects by Group:</h2>
        {mockGroups.map(group => {
          const groupProjects = mockProjects.filter(p => p.groupId === group.id)
          return (
            <div key={group.id} className="mb-4">
              <h3 className="text-lg font-medium">{group.name} (ID: {group.id})</h3>
              {groupProjects.length > 0 ? (
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
                  {JSON.stringify(groupProjects.map(p => ({ id: p.id, title: p.title })), null, 2)}
                </pre>
              ) : (
                <p className="text-gray-500">No projects for this group</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
