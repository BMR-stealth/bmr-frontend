import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MapPin,
  Mail,
  Phone,
  Building,
  DollarSign,
  FileText,
  Download,
  Users,
  Trophy,
  Clock,
} from 'lucide-react';

interface LeadDetailsModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (url: string, name: string) => void;
}

export function LeadDetailsModal({
  lead,
  isOpen,
  onClose,
  onDownload,
}: LeadDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Closed on {format(lead.loan.closeDate, 'MMMM d, yyyy')}
              </p>
            </div>
            <Badge variant={lead.loan.status === 'won' ? 'success' : 'destructive'}>
              {lead.loan.status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="loan">Loan Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {lead.location.city}, {lead.location.state} {lead.location.zip}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.contact.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Credit Score Range</p>
                  <p className="text-2xl font-bold">{lead.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">DTI Ratio</p>
                  <p className="text-2xl font-bold">{lead.dti}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employment Status</p>
                  <p className="text-2xl font-bold">{lead.employment.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Annual Income</p>
                  <p className="text-2xl font-bold">{lead.employment.annualIncome}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Loan Type</p>
                  <p className="text-2xl font-bold">{lead.loan.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Loan Amount</p>
                  <p className="text-2xl font-bold">{lead.loan.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Final Rate</p>
                  <p className="text-2xl font-bold">{lead.loan.finalRate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Term</p>
                  <p className="text-2xl font-bold">{lead.loan.term}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competition Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total Lenders</p>
                    <p className="text-xl font-bold">{lead.loan.competition.totalLenders}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Final Rank</p>
                    <p className="text-xl font-bold">#{lead.loan.competition.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Winning Rate</p>
                    <p className="text-xl font-bold">{lead.loan.competition.winningRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lead.history.contacts.map((contact: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{format(contact.date, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{contact.type}</TableCell>
                        <TableCell>{contact.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Officer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.history.notes.map((note: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(note.date, 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Repository</CardTitle>
                <CardDescription>
                  Access and download lead-related documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.history.documents.map((doc: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Added {format(doc.date, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(doc.url, doc.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}