import { source } from '@/lib/source';
import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import Link from 'next/link';
import Image from 'next/image';

function docsOptions(): DocsLayoutProps {
  return {
    ...baseOptions(),
    tree: source.getPageTree(),
    sidebar: {
      collapsible: false,
    },
    links: [
      {
        type: 'custom',
        children: <GithubInfo owner="slikts" repo="tuplerone" className="lg:-mx-2" />,
      },
    ],
    nav: {
      title: (
        <Link href="/" className="flex items-center gap-2 px-2 py-1">
          <img width={220} src="/logo.svg" alt="tuplerone" />
        </Link>
      ),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout {...docsOptions()}>{children}</DocsLayout>;
}
