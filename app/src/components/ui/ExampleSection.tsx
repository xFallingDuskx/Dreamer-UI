import { CodeBlock, Tabs, TabsContent, TabsList, TabsTrigger } from '@moondreamsdev/dreamer-ui/components';

interface ExampleSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
	id?: string;
	code?: string;
}

export function ExampleSection({ title, description, children, className = '', id, code }: ExampleSectionProps) {
	const sectionId =
		id ||
		title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '');

	return (
		<section className={`mb-12 ${className}`} id={sectionId}>
			<div className='mb-6'>
				<h3 className='text-2xl font-semibold text-white mb-2'>{title}</h3>
				{description && <p className='text-gray-400'>{description}</p>}
			</div>
			<div className='rounded-xl border border-gray-500/50 px-6 py-3'>
				{code ? (
					<Tabs defaultValue='preview' className='w-full'>
						<TabsList className='mb-4'>
							<TabsTrigger value='preview'>Preview</TabsTrigger>
							<TabsTrigger value='code'>Code</TabsTrigger>
						</TabsList>
						<TabsContent value='preview' className='border-0 py-2'>
							{children}
						</TabsContent>
						<TabsContent value='code' className='border-0'>
							<CodeBlock
								code={code}
								language='tsx'
								hideHeader={true}
								hideFiletype={true}
								allowCopy={true}
								allowFullscreen={false}
								allowDownload={false}
							/>
						</TabsContent>
					</Tabs>
				) : (
					children
				)}
			</div>
		</section>
	);
}
