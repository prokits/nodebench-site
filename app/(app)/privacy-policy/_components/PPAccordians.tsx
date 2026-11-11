import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, Database, FileKey, Shield, UserCog, Cookie, MessageCircle } from "lucide-react"


function Accordions({ data, defaultOpenValue }: {
    data:
    { title: string, content: string, icon: React.ReactNode, value?: string }[], defaultOpenValue?: string
}) {
    return (
        <Accordion type="single" collapsible defaultValue={defaultOpenValue} className="space-y-4">
            {data.map((item, index) => (
                <AccordionItem key={index} value={item.value || item.title} className="border border-zinc-300 dark:border-border rounded-lg px-4">
                    <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex gap-4 items-center">
                            {item.icon && (
                                <span>
                                    {item.icon}
                                </span>
                            )}
                            <span className="text-lg font-semibold">{item.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pr-4 text-muted-foreground">
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default function PPAccordions() {
    return (
        <div className="max-w-3xl mt-10 mb-20">
            <Accordions
                defaultOpenValue="intro"
                data={[
                    {
                        title: "Introduction",
                        content: "Welcome to nodebench's Privacy Policy. Yes, it's as thrilling as it sounds. But don't worry, we've made it as painless as possible. We respect your privacy, mainly because we have our own, and we wouldn't want anyone messing with ours either.",
                        value: "intro",
                        icon: <FileText />
                    },
                    {
                        title: "What Data We Collect",
                        content: "We collect the bare minimum data needed to provide our service: your email (to log you in), and the files you choose to upload. That's pretty much it. We don't track your location, your favorite color, or what you had for breakfast.",
                        value: "data-collection",
                        icon: <Database />
                    },
                    {
                        title: "How We Use Your Data",
                        content: "We use your data to... provide the service you signed up for. Shocking, we know. Your files are stored securely and are only accessible to those you choose to share them with. We don't analyze, sell, or do anything fancy with your data.",
                        value: "data-usage",
                        icon: <FileKey />
                    },
                    {
                        title: "Data Security",
                        content: "We take security seriously. Your files are encrypted, our servers are protected, and we regularly update our security measures. While no online service is 100% secure, we do our best to protect your data as if it were our own.",
                        value: "security",
                        icon: <Shield />
                    },
                    {
                        title: "Your Rights",
                        content: "You have the right to access, modify, or delete your data at any time. You can download your files, change your email, or delete your account entirely. It's your data, after all. We're just hosting it.",
                        value: "rights",
                        icon: <UserCog />
                    },
                    {
                        title: "Cookie Policy",
                        content: "We use essential cookies to keep you logged in and remember your preferences. That's it. No tracking cookies, no advertising cookies, no 'we want to know everything about you' cookies.",
                        value: "cookies",
                        icon: <Cookie />
                    },
                    {
                        title: "Contact Us",
                        content: "Have questions about your privacy? Concerns about your data? Just want to chat? Feel free to reach out to us through our contact page. We're real people and we actually read and respond to messages.",
                        value: "contact",
                        icon: <MessageCircle />
                    }
                ]}
            />
        </div>

    )
}