'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface NavItem {
  title: string
  href?: string
  icon?: string
  children?: NavItem[]
}

const navigationData: NavItem[] = [
  {
    title: 'Data Acquisition',
    children: [
      {
        title: 'Collect',
        href: '/collect'
      },
      {
        title: 'Engage',
        href: '/engage'
      },
      {
        title: 'Integrate',
        href: '/integrate'
      },
      {
        title: 'Guided Memory Journey',
        href: '/guided-memory'
      },
      {
        title: 'Scrape',
        children: [
          { title: 'Social media', href: '/scrape/social-media' },
          { title: 'Online media', href: '/scrape/online-media' },
          { title: 'Phonebook', href: '/scrape/phonebook' }
        ]
      }
    ]
  },
  {
    title: 'Processing',
    children: [
      {
        title: 'Processing Portal',
        href: '/processing-portal'
      },
      {
        title: 'Digital Twin',
        href: '/digital-twin'
      },
      {
        title: 'Duplicate Voice',
        href: '/duplicate-voice'
      },
      {
        title: 'Video Avatar',
        href: '/video-avatar'
      },
      {
        title: 'Capture Pneuma',
        href: '/capture-pneuma'
      }
    ]
  },
  {
    title: 'Experience Creation',
    children: [
      {
        title: 'Future Me',
        children: [
          { title: 'Talk', href: '/future-me/talk' },
          { title: 'Video call', href: '/future-me/video-call' },
          { title: "What do you think about..?", href: '/future-me/what-do-you-think' },
          { title: 'Reply', href: '/future-me/reply' }
        ]
      },
      {
        title: 'Stories',
        children: [
          { title: 'Locations portal', href: '/stories/locations' },
          { title: 'Timeline portal', href: '/stories/timeline' },
          { title: 'In the livingroom', href: '/stories/livingroom' }
        ]
      },
      {
        title: 'Photos & Videos',
        children: [
          { title: 'Early childhood videos', href: '/photos-videos/early-childhood' },
          { title: 'Fix old photos', href: '/photos-videos/fix-photos' },
          { title: 'Create new scenes', href: '/photos-videos/create-scenes' }
        ]
      },
      {
        title: 'Final Thoughts',
        children: [
          { title: 'After-death messages', href: '/final-thoughts/after-death' },
          { title: 'Talk in your funeral', href: '/final-thoughts/funeral-talk' },
          { title: 'Dying wishes', href: '/final-thoughts/dying-wishes' },
          { title: 'Send a letter in the future', href: '/final-thoughts/future-letter' }
        ]
      },
      {
        title: 'Funeral',
        children: [
          { title: 'Obituary creation', href: '/funeral/obituary' },
          { title: 'Notify people', href: '/funeral/notify' },
          { title: 'Shiva organization', href: '/funeral/shiva' }
        ]
      },
      {
        title: 'Write a letter in their handwriting',
        href: '/handwriting-letter'
      }
    ]
  }
]

interface NavItemComponentProps {
  item: NavItem
  level: number
}

function NavItemComponent({ item, level }: NavItemComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  const getIcon = () => {
    if (hasChildren) {
      return isOpen ? (
        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
      ) : (
        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
      )
    }
    return null
  }

  // Check if this item should show "coming soon" tag
  const shouldShowComingSoon = item.title !== 'Collect' && item.title !== 'Integrate' && item.title !== 'Guided Memory Journey' && item.href

  const content = (
    <div
      className={`flex items-center justify-between py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors ${
        level > 0 ? 'ml-4' : ''
      }`}
      onClick={toggleOpen}
    >
      <div className="flex items-center flex-1">
        <span className="flex-1">{item.title}</span>
        {shouldShowComingSoon && (
          <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            Coming Soon
          </span>
        )}
      </div>
      {getIcon()}
    </div>
  )

  return (
    <div>
      {item.href ? (
        <Link href={item.href}>{content}</Link>
      ) : (
        content
      )}
      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child, index) => (
            <NavItemComponent key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">💜</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Glow</h1>
          </div>
        </div>
        <div className="mt-4 text-right">
          <div className="text-sm font-medium text-gray-900">Sarah Wilson</div>
          <div className="text-xs text-gray-500">Premium Member</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="py-4">
          {navigationData.map((item, index) => (
            <NavItemComponent key={index} item={item} level={0} />
          ))}
        </nav>
      </div>
    </div>
  )
} 